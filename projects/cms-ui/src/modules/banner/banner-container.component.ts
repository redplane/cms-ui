import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver, ComponentRef,
  Inject, Injector,
  Input,
  OnDestroy, Optional,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {BANNER_BUILDER_PROVIDER, BANNER_SERVICE_PROVIDER, SPEECH_BUBBLE_ACTION_PROVIDER} from '../../constants/injection-token.constant';
import {IBannerService} from '../../services/interfaces/banner-service.interface';
import {Observable, of, Subject, Subscription, throwError} from 'rxjs';
import {BANNER_PRESERVE_MODE, BANNER_QUERY_MODE} from '../../constants/union-types.constant';
import {AlertBannerSettings} from '../../models/alert-banner-settings';
import {AlertBannerComponent} from './alert-banner/alert-banner.component';
import {IBannerDisplayRequest} from '../../interfaces/banners/banner-display-request.interface';
import {WINDOW} from '../../../../medadvisor-app/src/services/behavior/implementations/window.service';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';
import {delay, filter, map, mergeMap, retryWhen, switchMap, tap} from 'rxjs/operators';
import {IBannerBuilder} from '../../services/interfaces/banner-builder.interface';
import { IBannerComponent } from '../../interfaces/banners/banner-component.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'banner-container',
  templateUrl: 'banner-container.component.html'
})
export class BannerContainerComponent implements AfterViewInit, OnDestroy {

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
  public preserveMode: BANNER_PRESERVE_MODE = 'navigate-start-clear';

  // Get the banner container area.
  @ViewChild('container', {read: ViewContainerRef})
  public container: ViewContainerRef;

  // Background task which is for destroying currently displayed banner.
  private _destroyBannerTimer: number;

  // Id of currently displayed banner.
  private _displayingBannerId: string;

  // Subscription watch list.
  private readonly _subscription: Subscription;

  //#endregion

  //#region Constructor

  public constructor(@Inject(BANNER_SERVICE_PROVIDER) protected bannerService: IBannerService,
                     protected componentFactoryResolver: ComponentFactoryResolver,
                     protected router: Router,
                     @Inject(WINDOW) protected windowService: Window,
                     @Optional() @Inject(BANNER_BUILDER_PROVIDER) protected bannerBuilders: IBannerBuilder[]) {
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Methods

  public ngAfterViewInit(): void {

    const id = this.id;
    // Subscription about banner display requested.
    const displayBannerSubscription = this.bannerService
        .bannerDisplayRequested
        .subscribe(request => {
          // No banner has been displayed before.
          if (this.container.length < 1) {
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

              // Get the next settings.
              const nextRequest = this.queryMode === 'pop' ? this.bannerService.popRequest(request.containerId)
                  : this.bannerService.dequeueRequest(request.containerId);

              if (!nextRequest) {
                // Clear the host view.
                this.container.clear();
                return of(void (0));
              }

              return this.displayBannerAsync(nextRequest)
                  .pipe(
                      map(_ => void (0))
                  );
            })
        )
        .subscribe();

    this._subscription.add(nextBannerDisplayRequestSubscription);

    // Listen to navigation event.
    const navigationEventSubscription = this.router
        .events
        .pipe(
            filter(e => e instanceof RouterEvent),
            filter(e => (e instanceof NavigationCancel) || (e instanceof NavigationEnd) || (e instanceof NavigationError))
        )
        .subscribe((e: RouterEvent) => {
          if (((e instanceof NavigationCancel) || (e instanceof NavigationEnd) || (e instanceof NavigationError))
              && this.preserveMode === 'navigate-end-clear') {
            this.container.clear();
          }

          if ((e instanceof NavigationStart)
              && this.preserveMode === 'navigate-start-clear') {
            this.container.clear();
          }
        });
    this._subscription.add(navigationEventSubscription);

    const bannerDeleteRequestSubscription = this.bannerService
        .bannerDisplayDeleted
        .subscribe(deletedRequests => {

          const itemIndex = deletedRequests.find(deletedRequest => deletedRequest.bannerId === this._displayingBannerId);
          if (itemIndex < 0) {
            return;
          }

          this.container.clear();
        });
    this._subscription.add(bannerDeleteRequestSubscription);
  }

  // Called when component is destroyed.
  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }

    // Clear the previous timeout.
    if (this._destroyBannerTimer) {
      clearTimeout(this._destroyBannerTimer);
    }
  }

  // Display banner by handling request.
  protected displayBannerAsync(bannerDisplayRequest: IBannerDisplayRequest): Observable<void> {

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
                      tap((componentRef: ComponentRef<IBannerComponent>) => {
                        const hookDisposeRequest = componentRef.instance
                            .disposeRequestingEvent
                            .subscribe(_ => {
                              this.bannerService.displayNextBanner(this.id);
                            });

                        componentRef.onDestroy(() => {
                          if (hookDisposeRequest && !hookDisposeRequest.closed) {
                            hookDisposeRequest.unsubscribe();
                          }

                          this._displayingBannerId = null;
                        });

                        // Detect changes.
                        componentRef.changeDetectorRef.detectChanges();

                        this.container.clear();
                        this.container.insert(componentRef.hostView);

                        if (settings.timeout && settings.timeout.duration && settings.timeout.action) {
                          this._destroyBannerTimer = this.windowService
                              .setTimeout(() => {
                                // Do action on timeout.
                                settings.timeout.action();
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
}
