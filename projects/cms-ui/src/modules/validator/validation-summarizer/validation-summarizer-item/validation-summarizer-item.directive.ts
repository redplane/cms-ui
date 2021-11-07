import {AfterViewInit, ComponentRef, Directive, Inject, Input, OnDestroy, OnInit, Optional, ViewContainerRef} from '@angular/core';
import {IValidationSummarizerItemTemplateBuilder} from '../../../../services/interfaces/validation-summarizers/validation-summarizer-item-template-builder.interface';
import {VALIDATION_ITEM_TEMPLATE_BUILDERS} from '../../../../constants';
import {ValidationMessage} from '../../../../models';
import {AbstractControl, NgControl} from '@angular/forms';
import {NO_SUITABLE_VALIDATION_SUMMARIZER_ITEM_TEMPLATE_BUILDER_FOUND} from '../../../../constants/internal-exception-codes';
import {ValidationItemBuildContext} from '../../../../models/implementations/validation-summarizers/validation-item-build-context';
import {forkJoin, from, Observable, of, Subject, Subscription} from 'rxjs';
import {catchError, debounceTime, map, switchMap} from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[validationSummarizerItem]'
})
// tslint:disable-next-line:directive-class-suffix
export class ValidationSummarizerItemDirective implements OnInit, AfterViewInit, OnDestroy {

  //#region Properties

  // Id of validation summarizer.
  // tslint:disable-next-line:variable-name
  private _containerId: string;

  // tslint:disable-next-line:variable-name
  private _validationMessages: ValidationMessage[] | undefined;

  // Form control which is being validated.
  // tslint:disable-next-line:variable-name
  private _control: AbstractControl | NgControl | undefined;

  // Control label.
  // tslint:disable-next-line:variable-name
  private _label: string | undefined;

  // Subject which triggers validation.
  // tslint:disable-next-line:variable-name
  private readonly _validationTriggerSubject: Subject<void>;

  // Subscription watch list.
  // tslint:disable-next-line:variable-name
  private readonly _subscription: Subscription;

  //#endregion

  //#region Accessors

  public get containerId(): string {
    return this._containerId;
  }

  @Input()
  public set containerId(value: string) {
    this._containerId = value;
  }

  public get validationMessages(): ValidationMessage[] | undefined {
    return this._validationMessages;
  }

  @Input()
  public set validationMessages(value: ValidationMessage[] | undefined) {

    if (!value) {
      this._validationMessages = [];
      return;
    }

    this._validationMessages = value;
  }

  public get ngControl(): AbstractControl | NgControl | undefined {
    return this._control;
  }

  @Input()
  public set ngControl(value: AbstractControl | NgControl | undefined) {
    this._control = value;
  }

  public get controlLabel(): string | undefined {
    return this._label;
  }

  @Input()
  public set controlLabel(value: string | undefined) {
    this._label = value;
  }

  //#endregion

  //#region Constructor

  public constructor(
    protected viewContainerRef: ViewContainerRef,
    // tslint:disable-next-line:max-line-length
    @Inject(VALIDATION_ITEM_TEMPLATE_BUILDERS) @Optional() protected readonly validationItemTemplateBuilders: IValidationSummarizerItemTemplateBuilder[]) {
    this._containerId = '';

    this._validationTriggerSubject = new Subject<void>();
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycle

  public ngOnInit(): void {

    const validationTriggerSubscription = this._validationTriggerSubject
      .pipe(
        debounceTime(50),
        map(() => this._validationMessages || []),
        switchMap(validationMessages => {

          // Observables to be completed.
          const observables: Observable<ComponentRef<any> | null>[] = [];
          for (const validationMessage of validationMessages) {
            const loadValidationItemComponentRefObservable = from(this.loadValidationItemComponentRef(validationMessage))
              .pipe(
                catchError(() => {
                  return of(null);
                })
              );
            observables.push(loadValidationItemComponentRefObservable);
          }

          return forkJoin(observables);
        })
      )
      .subscribe((componentRefs: (ComponentRef<any> | null) []) => {
        // Clear the view container.
        this.viewContainerRef.clear();

        for (const componentRef of componentRefs) {
          if (!componentRef) {
            continue;
          }
          this.viewContainerRef.insert(componentRef.hostView);
        }
      });
    this._subscription.add(validationTriggerSubscription);
  }

  public async ngAfterViewInit(): Promise<void> {

    if (!this.ngControl || !this.ngControl.valueChanges) {
      return;
    }

    const valueChangeSubscription = this.ngControl.valueChanges
      .subscribe(() => {
        this._validationTriggerSubject.next();
      });
    this._subscription.add(valueChangeSubscription);

    // Trigger the validation right after the view has been initialized.
    this._validationTriggerSubject.next();
  }

  // Called when component is destroyed.
  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }

  //#endregion

  //#region Methods

  // Load suitable item template builder asynchronously.
  protected async loadSuitableItemTemplateBuilderAsync(validationMessage: ValidationMessage)
    : Promise<IValidationSummarizerItemTemplateBuilder> {

    if (!this.validationItemTemplateBuilders || !this.validationItemTemplateBuilders.length) {
      throw new Error(NO_SUITABLE_VALIDATION_SUMMARIZER_ITEM_TEMPLATE_BUILDER_FOUND);
    }

    // Build the context.
    const validationItemBuildContext = this.loadValidationItemBuildContext(validationMessage);

    for (const validationTemplateBuilder of this.validationItemTemplateBuilders) {

      // Check whether template can be built or not.
      const ableToBuildTemplate = await validationTemplateBuilder.ableToBuildTemplateAsync(validationItemBuildContext).toPromise();
      if (!ableToBuildTemplate) {
        continue;
      }

      return validationTemplateBuilder;
    }

    throw new Error(NO_SUITABLE_VALIDATION_SUMMARIZER_ITEM_TEMPLATE_BUILDER_FOUND);
  }

  protected loadValidationItemBuildContext(validationMessage: ValidationMessage): ValidationItemBuildContext {
    return new ValidationItemBuildContext(this.containerId, this._label,
      validationMessage, this.ngControl);
  }

  // Load validation item component reference.
  protected async loadValidationItemComponentRef(validationMessage: ValidationMessage): Promise<ComponentRef<any>> {
    // Build the message context.
    const context = this.loadValidationItemBuildContext(validationMessage);

    // Get the suitable item template builder.
    const suitableItemTemplateBuilder = await this.loadSuitableItemTemplateBuilderAsync(validationMessage);

    // Build the component ref.
    return await suitableItemTemplateBuilder.buildTemplateAsync(context).toPromise();
  }

//#endregion
}
