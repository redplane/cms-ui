import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef
} from '@angular/core';
import {AbstractControl, FormControlDirective, FormGroup, NgControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {
  MULTIPLE_VALIDATION_SUMMARIZER_CONTEXT_CHANGED_EVENT,
  MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS,
  MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER,
  MULTIPLE_VALIDATION_SUMMARIZER_SERVICE,
  VALIDATION_SUMMARIZER_OPTIONS_PROVIDER,
  VALIDATION_SUMMARIZER_SERVICE
} from '../../../constants';
import {IValidationSummarizerService} from '../../../services';
import {v4 as uuid} from 'uuid';
import {MultipleValidationSummarizerItemContextDirective} from './directives/multiple-validation-summarizer-item-context.directive';
import {MultipleValidationSummarizerItemContext} from '../../../models/interfaces/multiple-validation-summarizers/multiple-validation-summarizer-item-context';
import {IValidationSummarizerOptionProvider} from '../../../providers';
import {VALIDATION_SUMMARIZER_OPTIONS} from '../../../constants/injectors/internal-injectors';

const basicValidationHandler = (ngControl: AbstractControl | NgControl): boolean => {
  if (!ngControl) {
    return false;
  }

  return (ngControl.invalid && (ngControl.dirty || ngControl.touched)) || false;
};

@Component({
  selector: 'cms-multiple-validation-summarizer',
  templateUrl: 'multiple-validation-summarizer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: VALIDATION_SUMMARIZER_SERVICE,
      useExisting: MULTIPLE_VALIDATION_SUMMARIZER_SERVICE
    },
    {
      provide: VALIDATION_SUMMARIZER_OPTIONS,
      useExisting: MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS
    },
    {
      provide: VALIDATION_SUMMARIZER_OPTIONS_PROVIDER,
      useExisting: MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER,
      multi: false
    }
  ]
})
export class MultipleValidationSummarizerComponent implements OnInit, AfterContentInit, OnDestroy {

  //#region Properties

  // Group id.
  private _groupId: string;

  // Id to label.
  private _idToLabel: { [id: string]: string };

  // Id to template.
  private _idToTemplate: { [id: string]: TemplateRef<MultipleValidationSummarizerItemContext> | null };

  // Id to instance.
  private _idToInstance: { [id: string]: AbstractControl | FormGroup | FormControlDirective | null };

  // Handler for handling summarizer visibility.
  // tslint:disable-next-line:variable-name
  private _visibilityHandler: ((ngControl: AbstractControl | NgControl) => boolean);

  // Whether there is any invalid field or not.
  private _hasInvalidField: boolean;

  // Id to control status change subscription.
  private _idToControlStatusChangeSubscription: { [id: string]: Subscription | null } = {};

  // Subscription about validation context changes.
  private _validationContextChangesSubscription: Subscription | null = null;

  // Subscription watch list.
  private _subscription: Subscription;

  // Context directive watch list.
  @ContentChildren(MultipleValidationSummarizerItemContextDirective)
  public itemContexts: QueryList<MultipleValidationSummarizerItemContextDirective> | null = null;

  //#endregion

  //#region Accessors

  // Id to label mapping.
  public get idToLabel(): { [id: string]: string } {
    return this._idToLabel;
  }

  // Id to template mapping.
  public get idToTemplate(): { [id: string]: TemplateRef<MultipleValidationSummarizerItemContext> | null } {
    return this._idToTemplate;
  }

  public get idToInstance(): { [id: string]: AbstractControl | FormGroup | FormControlDirective | null } {
    return this._idToInstance;
  }

  public get groupId(): string {
    return this._groupId;
  }

  // Id of group the multiple validation summarizer belongs to.
  @Input('group-id')
  public set groupId(value: string) {
    this._groupId = value;
  }

  // Whether there is any invalid field or not.
  public get hasInvalidField(): boolean {
    return this._hasInvalidField;
  }

  // tslint:disable-next-line:no-input-rename
  @Input('visibility-handler')
  public set visibilityHandler(value: ((ngControl: AbstractControl | NgControl) => boolean) | null) {
    if (!value) {
      this._visibilityHandler = basicValidationHandler;
      return;
    }
    this._visibilityHandler = value;
  }

  public get visibilityHandler(): (((ngControl: AbstractControl | NgControl) => boolean) | null) {
    return this._visibilityHandler;
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(MULTIPLE_VALIDATION_SUMMARIZER_SERVICE)
                     protected readonly validationSummarizerService: IValidationSummarizerService,
                     @Inject(MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER)
                     protected readonly optionsProvider: IValidationSummarizerOptionProvider,
                     protected readonly changeDetectorRef: ChangeDetectorRef) {

    const options = this.optionsProvider.getOption();
    this._groupId = options?.groupId || uuid();
    this._idToLabel = {};
    this._idToTemplate = {};
    this._idToInstance = {};
    this._visibilityHandler = options.visibilityHandler || basicValidationHandler;
    this._hasInvalidField = false;
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycle hooks

  public ngOnInit(): void {
  }

  // Called when content has been initialized.
  public ngAfterContentInit(): void {
    // Handle control initial changes.
    this.handleControlChanges();
    this.changeDetectorRef.markForCheck();

    // Hook control changes.
    const hookControlChangesSubscription = this.itemContexts
      ?.changes
      .subscribe(() => {
        this.handleControlChanges();
        this.changeDetectorRef.markForCheck();
      });
    this._subscription.add(hookControlChangesSubscription);
  }

  // Called when component is destroyed.
  public ngOnDestroy(): void {
    this.deleteControlStatusChangeSubscriptions();
    this._validationContextChangesSubscription?.unsubscribe();
    this._subscription?.unsubscribe();
  }

  //#endregion

  //#region Methods

  //#endregion

  //#region Internal methods

  private handleControlChanges(): void {

    // Unsubscribe the previous control status.
    this._validationContextChangesSubscription?.unsubscribe();

    // Clear the mapping.
    this._idToLabel = {};
    this._idToTemplate = {};
    this._hasInvalidField = false;

    // Invalid item collection.
    if (!this.itemContexts || !this.itemContexts.length) {
      return;
    }

    // Handle control changes.
    for (const itemContext of this.itemContexts) {
      this.handleContextChangedEvent(itemContext, {name: 'label', value: itemContext.label});
      this.handleContextChangedEvent(itemContext, {name: 'template', value: itemContext.template});
      this.handleContextChangedEvent(itemContext, {name: 'instance', value: itemContext.instance});

      const validationContextChangeSubscription = itemContext.updateEvent
        .subscribe(
          (context: MULTIPLE_VALIDATION_SUMMARIZER_CONTEXT_CHANGED_EVENT) => {
            this.handleContextChangedEvent(itemContext, context, true);
          });
      this._validationContextChangesSubscription?.add(validationContextChangeSubscription);
    }

    // Check whether there is any invalid field or not.
    this._hasInvalidField = this.shouldAnyFieldInvalid();
    this.changeDetectorRef.markForCheck();
  }

  // Handle context change event.
  private handleContextChangedEvent(itemContext: MultipleValidationSummarizerItemContextDirective,
                                    context: MULTIPLE_VALIDATION_SUMMARIZER_CONTEXT_CHANGED_EVENT,
                                    markAsChanged?: boolean): void {
    switch (context.name) {
      case 'label':
        this._idToLabel[itemContext.id] = context.value;
        break;

      case 'template':
        this._idToTemplate[itemContext.id] = context.value;
        break;

      case 'instance':

        // Unsubscribe this instance subscription.
        let controlChangesSubscription = this._idToControlStatusChangeSubscription[itemContext.id];
        controlChangesSubscription?.unsubscribe();
        delete this._idToInstance[itemContext.id];

        let valueChangesObservable: Observable<any> | null = null;
        if (itemContext.instance instanceof AbstractControl) {
          valueChangesObservable = (itemContext.instance as AbstractControl).statusChanges;
        } else if (itemContext.instance instanceof NgControl) {
          valueChangesObservable = (itemContext.instance as NgControl).statusChanges;
        }

        if (valueChangesObservable) {
          this._idToInstance[itemContext.id] = context.value;
          controlChangesSubscription = valueChangesObservable
            .subscribe(() => {
              const instance = this._idToInstance[itemContext.id];
              if (!instance) {
                return;
              }

              this._hasInvalidField = this.shouldAnyFieldInvalid();
              this.changeDetectorRef.markForCheck();
            });

          this._subscription.add(controlChangesSubscription);
        }

        break;
    }

    if (markAsChanged) {
      this.changeDetectorRef.markForCheck();
    }
  }

  // Remove control status change subscription.
  private deleteControlStatusChangeSubscriptions(): void {
    const ids = Object.keys(this._idToControlStatusChangeSubscription);
    for (const id of ids) {
      const controlStatusChangeSubscription = this._idToControlStatusChangeSubscription[id];
      controlStatusChangeSubscription?.unsubscribe();
    }

    this._idToControlStatusChangeSubscription = {};
  }

  // Whether there is any invalid field or not.
  private shouldAnyFieldInvalid(): boolean {
    const ids = Object.keys(this._idToInstance);
    if (!ids || !ids.length) {
      return false;
    }

    for (const id of ids) {
      const instance = this.idToInstance[id];
      if (!instance) {
        continue;
      }

      const validationErrors = this.validationSummarizerService.loadControlValidationErrors(instance as any);
      if (!validationErrors) {
        continue;
      }

      const shouldValidationErrorVisible = this.visibilityHandler ? this._visibilityHandler(instance) : false;
      if (!shouldValidationErrorVisible) {
        continue;
      }

      return true;
    }

    return false;
  }

  //#endregion
}
