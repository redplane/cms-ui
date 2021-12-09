import {Directive, Inject, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {REQUIREMENT_SENTINEL_SERVICE} from '../../../constants/injectors/injectors';
import {of, Subject, Subscription} from 'rxjs';
import {catchError, debounceTime, mergeMap} from 'rxjs/operators';
import {IMeetRequirementService} from './requirement-sentinel-service.interface';

@Directive({
  selector: '[meetRequirement]'
})
export class RequirementSentinelDirective implements OnInit, OnDestroy {

  //#region Properties

  // Name of requirement which must be satisfied.
  // tslint:disable-next-line:variable-name
  private _requirement: string | undefined;

  // Handle the requirement which is assigned to the current directive.
  // tslint:disable-next-line:variable-name
  private readonly _handleRequirementSubject: Subject<string>;

  // Subscription watch list.
  // tslint:disable-next-line:variable-name
  private readonly _subscription: Subscription;

  //#endregion

  //#region Accessors

  @Input('meetRequirement')
  public set requirement(value: string) {
    this._requirement = value;
    this._handleRequirementSubject.next(value);
  }

  //#endregion

  //#region Constructor

  public constructor(
    @Inject(REQUIREMENT_SENTINEL_SERVICE)
    protected readonly meetRequirementService: IMeetRequirementService,
    protected readonly viewContainerRef: ViewContainerRef,
    protected readonly templateRef: TemplateRef<any>) {
    this._requirement = undefined;
    this._handleRequirementSubject = new Subject<string>();
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycles

  public ngOnInit(): void {

    const handleRequirementSubscription = this._handleRequirementSubject
      .pipe(
        debounceTime(250),
        mergeMap(name => this.meetRequirementService.shouldRequirementMetAsync(name)),
        catchError(_ => of(false))
      )
      .subscribe(metRequirement => {

        // Clear the container.
        this.viewContainerRef.clear();
        if (!metRequirement) {
          return;
        }

        this.viewContainerRef.createEmbeddedView(this.templateRef);
      });
    this._subscription.add(handleRequirementSubscription);

    // Do the first requirement check.
    this._handleRequirementSubject.next(this._requirement);
  }

  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }

  //#endregion
}
