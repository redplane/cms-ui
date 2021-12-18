import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  Input,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {BANNER_BUILDER, BANNER_SERVICE} from '../../constants/injectors/injectors';
import {Observable, of, Subscription, throwError} from 'rxjs';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';
import {filter, map, mergeMap, retryWhen, switchMap, tap} from 'rxjs/operators';
import {BANNER_PRESERVE_MODE, BANNER_QUERY_MODE} from '../../constants/data-type.constant';
import {findLastIndex} from 'lodash-es';
import {IBannerContentBuilder} from '../../services/interfaces/banners/banner-content-builder.interface';
import {BannerService} from '../../services/implementations/banners/banner.service';
import {IDisplayBannerRequest} from '../../models/interfaces/banners/add-banner-content-request.interface';
import {IBannerContentComponent} from '../../models/interfaces/banners/banner-content-component.interface';
import {IDeleteBannerRequest} from '../../models/interfaces/banners/delete-banner-content-request.interface';
import {WINDOW} from '../../constants/injectors/internal-injectors';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cms-banner',
  templateUrl: 'banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent implements AfterViewInit, OnDestroy {

  //#region Properties

  // Unique id of a banner container.
  @Input()
  public id: string;

  // How banner is queried for being displayed.
  // tslint:disable-next-line:no-input-rename
  @Input('query-mode')
  public queryMode: BANNER_QUERY_MODE;

  // How banner preserve message.
  // tslint:disable-next-line:no-input-rename
  @Input('preserve-mode')
  public preserveMode: BANNER_PRESERVE_MODE;

  // Get the banner container area.
  @ViewChild('container', {read: ViewContainerRef})
  public container: ViewContainerRef | null;

  // Request which is currently applied to the banner container.
  // tslint:disable-next-line:variable-name
  private _displayingRequest: IDisplayBannerRequest | null;

  // Background task which is for destroying currently displayed banner.
  // tslint:disable-next-line:variable-name
  private _destroyBannerTimer: number | null;

  // List of request about banner display.
  // tslint:disable-next-line:variable-name
  private readonly _displayRequests: IDisplayBannerRequest[];

  // Subscription watch list.
  // tslint:disable-next-line:variable-name
  private readonly _subscription: Subscription;

  //#endregion

  //#region Services

  // Service for handling banner business.
  protected readonly bannerService: BannerService;

  // Component factory resolver.
  protected readonly componentFactoryResolver: ComponentFactoryResolver;

  // Router service.
  protected readonly router: Router;

  // Window service.
  protected readonly windowService: Window;

  // Banner builder.
  protected readonly bannerBuilders: IBannerContentBuilder[];

  protected readonly changeDetectorRef: ChangeDetectorRef;

  //#endregion

  //#region Constructor

  public constructor(protected injector: Injector) {
    this.id = '';
    this.queryMode = 'pop';
    this.preserveMode = 'navigate-start-clear';
    this.container = null;
    this._destroyBannerTimer = null;
    this._displayingRequest = null;
    this._displayRequests = [];

    // Service reflection.
    this.bannerService = this.injector.get(BANNER_SERVICE) as any as BannerService;
    this.componentFactoryResolver = this.injector.get(ComponentFactoryResolver);
    this.router = this.injector.get(Router);
    this.windowService = this.injector.get(WINDOW) as Window;
    this.bannerBuilders = this.injector.get(BANNER_BUILDER) as any as IBannerContentBuilder[];
    this.changeDetectorRef = this.injector.get(ChangeDetectorRef);
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Methods

  public ngAfterViewInit(): void {

    const id = this.id;

    // Subscription about banner display requested.
    const displayBannerSubscription = this.bannerService
      .addedRequestEvent
      .subscribe(request => {

        // Container is invalid.
        if (!this.container) {
          return;
        }

        // Add the request into list.
        this._displayRequests.push(request);

        // No banner has been displayed before.
        if (!this._displayingRequest) {
          this.bannerService.displayNextBanner(id);
        }
      });
    this._subscription.add(displayBannerSubscription);

    // Subscription which raises when next banner display is requested.
    const nextBannerDisplayRequestSubscription = this.bannerService
      .nextBannerDisplayRequested
      .pipe(
        switchMap(request => {

          // Invalid container.
          if (request.containerId && request.containerId !== id) {
            return of(void (0));
          }

          if (!request.containerId) {
            return of(void (0));
          }

          // Get the next settings.
          const nextRequest = this.queryMode === 'pop' ? this.popRequest(request.containerId)
            : this.dequeueRequest(request.containerId);

          if (!nextRequest) {
            // Clear the host view.
            if (this.container) {
              this.container.clear();
              this._displayingRequest = null;
            }

            return of(void (0));
          }

          return this.displayBannerAsync(nextRequest)
            .pipe(
              map(_ => void (0))
            );
        })
      )
      .subscribe(() => {
        this.changeDetectorRef.markForCheck();
      });

    this._subscription.add(nextBannerDisplayRequestSubscription);

    // Listen to navigation event.
    const navigationEventSubscription = this.router
      .events
      .pipe(
        filter(e => e instanceof RouterEvent),
        filter(e => (e instanceof NavigationCancel) || (e instanceof NavigationEnd) || (e instanceof NavigationError))
      )
      .subscribe(e => {

        if (!this.container) {
          return;
        }

        if (((e instanceof NavigationCancel) || (e instanceof NavigationEnd) || (e instanceof NavigationError))
          && this.preserveMode === 'navigate-end-clear') {
          this.container.clear();
          this.changeDetectorRef.markForCheck();
        }

        if ((e instanceof NavigationStart)
          && this.preserveMode === 'navigate-start-clear') {
          this.container.clear();
          this.changeDetectorRef.markForCheck();
        }
      });
    this._subscription.add(navigationEventSubscription);

    // Hook delete display banner request.
    this.hookDeleteRequestEvent();
  }

  // Called when component is destroyed.
  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();

    // Clear the previous timeout.
    if (this._destroyBannerTimer) {
      this.windowService.clearTimeout(this._destroyBannerTimer);
    }
  }

  //#endregion

  //#region Internal methods

  protected hookDeleteRequestEvent(): void {
    const deleteRequestSubscription = this.bannerService
      .deleteRequestEvent
      .subscribe(deleteRequest => {

        // Container is invalid.
        if (!this.container) {
          return;
        }

        let index = 0;

        while (index < this._displayRequests.length) {

          // Container is invalid.
          if (deleteRequest.containerId && deleteRequest.containerId !== this.id) {
            index++;
            continue;
          }

          // Request id is invalid.
          if (deleteRequest.id && deleteRequest.id !== this._displayingRequest?.id) {
            index++;
            continue;
          }

          this._displayRequests.splice(index, 1);
        }

        if (!this.ableToDeleteDisplayingRequest(deleteRequest)) {
          return;
        }

        this.container.clear();
        this._displayingRequest = null;
        this.changeDetectorRef.markForCheck();
      });
    this._subscription.add(deleteRequestSubscription);
  }

  // Display banner by handling request.
  protected displayBannerAsync(bannerDisplayRequest: IDisplayBannerRequest): Observable<void> {

    // Invalid request.
    if (!bannerDisplayRequest) {
      return of(void (0));
    }

    // Request does not belong to the current container.
    if (bannerDisplayRequest.containerId && this.id
      && bannerDisplayRequest.containerId !== this.id) {
      return of(void (0));
    }

    const settings = bannerDisplayRequest.settings;
    if (!settings) {
      return of(void (0));
    }

    // Clear the previous timeout.
    if (this._destroyBannerTimer) {
      this.windowService.clearTimeout(this._destroyBannerTimer);
    }

    let itemIndex = 0;
    const builders = this.bannerBuilders;
    const isNotAbleToBuildException = 'IS_NOT_ABLE_TO_BE_BUILT';
    const noBuilderAvailableException = 'NO_BUILDER_AVAILABLE';
    const maxRetriesExceeded = 'MAX_RETRIES_EXCEEDED';

    return of(void (0))
      .pipe(
        tap(_ => {
          if (!builders) {
            throw noBuilderAvailableException;
          }

          if (itemIndex > builders.length - 1) {
            throw maxRetriesExceeded;
          }
        }),
        mergeMap(_ => builders[itemIndex].canBuildAsync(bannerDisplayRequest.settings)),
        mergeMap(ableToBuild => {
          if (!ableToBuild) {
            return throwError(isNotAbleToBuildException);
          }

          return builders[itemIndex].buildAsync(bannerDisplayRequest.settings)
            .pipe(
              tap((componentRef: ComponentRef<IBannerContentComponent>) => {

                if (!this.container) {
                  return;
                }

                // Update the request.
                this._displayingRequest = bannerDisplayRequest;

                const hookDisposeRequest = componentRef.instance
                  .disposeRequestingEvent
                  .subscribe((_: any) => {
                    this.bannerService.displayNextBanner(this.id);
                  });

                componentRef.onDestroy(() => {
                  if (hookDisposeRequest && !hookDisposeRequest.closed) {
                    hookDisposeRequest.unsubscribe();
                  }

                  // Mark no request to be displayed.
                  this._displayingRequest = null;
                });

                // Detect changes.
                componentRef.changeDetectorRef.detectChanges();

                this.container.clear();
                this.container.insert(componentRef.hostView);

                if (settings.timeout && settings.timeout.duration && settings.timeout.action) {
                  this._destroyBannerTimer = this.windowService
                    .setTimeout(() => {
                      // Do action on timeout.
                      if (settings && settings.timeout) {
                        settings.timeout.action();
                      }
                    }, settings.timeout.duration);
                }
              }),
              map(_ => void (0))
            );
        }),
        retryWhen(exceptionObservable => {
          return exceptionObservable
            .pipe(
              tap(exception => {
                if (exception !== isNotAbleToBuildException) {
                  throw exception;
                }

                itemIndex++;
              })
            );
        })
      );

    //#endregion
  }

  // Whether displaying request is removable or not.
  protected ableToDeleteDisplayingRequest(deleteRequest: IDeleteBannerRequest): boolean {

    if (deleteRequest.containerId && deleteRequest.containerId !== this.id) {
      return false;
    }

    if (deleteRequest.id && deleteRequest.id !== this._displayingRequest?.id) {
      return false;
    }

    return true;
  }

  // Dequeue request.
  protected dequeueRequest(containerId: string): IDisplayBannerRequest | null {
    if (!this._displayRequests || !this._displayRequests.length) {
      return null;
    }

    // Get first match item in the messages list.
    const itemIndex = this._displayRequests.findIndex(x => x.containerId === containerId);
    if (itemIndex < 0) {
      return null;
    }

    const item = this._displayRequests[itemIndex];
    this._displayRequests.splice(itemIndex, 1);
    return item;
  }

  // Pop request.
  protected popRequest(containerId: string): IDisplayBannerRequest | null {
    if (!this._displayRequests || !this._displayRequests.length) {
      return null;
    }

    // Find the last index of item.
    const lastIndex = findLastIndex(this._displayRequests, x => x.containerId === containerId);
    if (lastIndex < 0) {
      return null;
    }

    const item = this._displayRequests[lastIndex];
    this._displayRequests.splice(lastIndex, 1);
    return item;
  }

  //#endregion
}
