import {Directive, Inject, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {REQUIRE_ROLE_PERMISSION_SERVICE_PROVIDER} from '../../../constants';
import {of, Subject, Subscription} from 'rxjs';
import {catchError, debounceTime, switchMap} from 'rxjs/operators';
import {IRequireRolePermissionService} from './require-role-permission-service.interface';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[hasRoles]'
})
export class RequireRolePermissionDirective implements OnInit, OnDestroy {

  //#region Properties

  // Name of feature.
  // tslint:disable-next-line:variable-name
  private _names: string[];

  // Raise event about displaying feature content.
  // tslint:disable-next-line:variable-name
  private _displayRoleContentSubject: Subject<string[]>;

  // Subscription watch list.
  // tslint:disable-next-line:variable-name
  private readonly _subscription: Subscription;

  //#endregion

  //#region Accessors

  @Input('hasRoles')
  public set name(value: string | string[]) {

    if (value instanceof Array) {
      this._names = value as string[];
    } else {
      this._names = [value];
    }

    this._displayRoleContentSubject.next(this._names);
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(REQUIRE_ROLE_PERMISSION_SERVICE_PROVIDER)
                     protected readonly requireRolePermissionService: IRequireRolePermissionService,
                     protected readonly viewContainerRef: ViewContainerRef,
                     protected readonly templateRef: TemplateRef<any>) {

    this._names = [];
    this._displayRoleContentSubject = new Subject<string[]>();
    this._subscription = new Subscription();
  }

//#endregion

  //#region Methods

  public ngOnInit(): void {

    const displayFeatureContentSubscription = this._displayRoleContentSubject
      .pipe(
        debounceTime(250),
        switchMap((names: string[]) => {
          return this.requireRolePermissionService.hasAnyRoleAsync(names)
            .pipe(
              catchError(_ => of(false))
            );
        }),
      )
      .subscribe(ableToAccessFeature => {
        this.viewContainerRef.clear();
        if (!ableToAccessFeature) {
          return;
        }

        this.viewContainerRef.createEmbeddedView(this.templateRef);
      });
    this._subscription.add(displayFeatureContentSubscription);

    const hookRoleValidationSubscription = this.requireRolePermissionService
      .hookValidationEventAsync()
      .subscribe(() => {
        this._displayRoleContentSubject.next(this._names);
      });
    this._subscription.add(hookRoleValidationSubscription);

    // Trigger validation.
    this._displayRoleContentSubject.next(this._names);
  }

  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }

  //#endregion
}
