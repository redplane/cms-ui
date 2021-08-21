import {Directive, Inject, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {FEATURE_SENTINEL_SERVICE_PROVIDER} from '../../../constants';
import {IFeatureSentinelService} from './feature-sentinel-service.interface';
import {of, Subject, Subscription} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[hasFeatureAccess]'
})
export class RequirePermissionFeatureDirective implements OnInit, OnDestroy {

  //#region Properties

  // Name of feature.
  // tslint:disable-next-line:variable-name
  private _names: string[];

  // Raise event about displaying feature content.
  // tslint:disable-next-line:variable-name
  private _displayFeatureContentSubject: Subject<string[]>;

  // Subscription watch list.
  // tslint:disable-next-line:variable-name
  private readonly _subscription: Subscription;

  //#endregion

  //#region Accessors

  @Input('hasFeatureAccess')
  public set name(value: string | string[]) {

    if (value instanceof Array) {
      this._names = value as string[];
    } else {
      this._names = [value];
    }

    this._displayFeatureContentSubject.next(this._names);
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(FEATURE_SENTINEL_SERVICE_PROVIDER)
                     protected readonly requireFeaturePermissionService: IFeatureSentinelService,
                     protected readonly viewContainerRef: ViewContainerRef,
                     protected readonly templateRef: TemplateRef<any>) {

    this._names = [];
    this._displayFeatureContentSubject = new Subject<string[]>();
    this._subscription = new Subscription();
  }

//#endregion

  //#region Methods

  public ngOnInit(): void {

    const displayFeatureContentSubscription = this._displayFeatureContentSubject
      .pipe(
        distinctUntilChanged(),
        debounceTime(250),
        switchMap((names: string[]) => {
          return this.requireFeaturePermissionService.ableToAccessFeaturesAsync(names)
            .pipe(
              catchError(_ => of(false))
            );
        }),
      )
      .subscribe(ableToAccessFeature => {
        if (!ableToAccessFeature) {
          this.viewContainerRef.clear();
          return;
        }

        this.viewContainerRef.createEmbeddedView(this.templateRef);
      });
    this._subscription.add(displayFeatureContentSubscription);

    this._displayFeatureContentSubject.next(this._names);
  }

  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }

  //#endregion
}
