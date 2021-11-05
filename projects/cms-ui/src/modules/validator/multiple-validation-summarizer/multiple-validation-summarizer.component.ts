import {ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {AbstractControl, NgControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {ValidationMessage} from '../../../models';
import {
  MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER,
  MULTIPLE_VALIDATION_SUMMARIZER_SERVICE_PROVIDER
} from '../../../constants';
import {IValidationSummarizerService} from '../../../services';
import {IMultipleValidationSummarizerOptions} from '../../../models/interfaces/multiple-validation-summarizers/multiple-validation-summarizer-options.interface';
import {v4 as uuid} from 'uuid';
import {MultipleValidationItemTemplateContext} from './multiple-validation-item-template-context';
import {MultipleValidationControlContext} from './multiple-validation-control-context';

@Component({
  selector: 'cms-multiple-validation-summarizer',
  templateUrl: 'multiple-validation-summarizer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleValidationSummarizerComponent implements OnInit, OnDestroy {

  //#region Properties

  // Group id.
  private _groupId: string;

  // Abstract control contexts.
  private _instances: MultipleValidationControlContext[] = [];

  // Validation messages.
  private _validationMessages: ValidationMessage[] = [];

  // Hook abstract value changes subscription.
  private _hookAbstractControlStatusChangesSubscription: Subscription = new Subscription();

  // Item template
  private _itemTemplate: TemplateRef<MultipleValidationItemTemplateContext> | null = null;

  // Handler for handling summarizer visibility.
  // tslint:disable-next-line:variable-name
  private _visibilityHandler: ((ngControl: AbstractControl | NgControl) => boolean) | null;

  // Validation item template context.
  private _validationItemTemplateContexts: MultipleValidationItemTemplateContext[];

  // Whether there is any invalid field or not.
  private _hasInvalidField: boolean;

  //#endregion

  //#region Accessors

  public get groupId(): string {
    return this._groupId;
  }

  // Id of group the multiple validation summarizer belongs to.
  @Input('group-id')
  public set groupId(value: string) {
    this._groupId = value;
  }

  // Items to be validated.
  @Input('instances')
  public set instances(items: MultipleValidationControlContext[]) {
    this._hookAbstractControlStatusChangesSubscription?.unsubscribe();
    this._hookAbstractControlStatusChangesSubscription = new Subscription();

    if (!items || !items.length) {
      return;
    }

    for (const item of items) {

      if (!item.control) {
        continue;
      }

      let statusChangesObservable: Observable<any> | null = null;
      if (item.control instanceof AbstractControl) {
        statusChangesObservable = (item.control as AbstractControl).statusChanges;
      } else if (item.control instanceof NgControl) {
        statusChangesObservable = (item.control as NgControl).statusChanges;
      }

      if (statusChangesObservable) {
        const statusChangesSubscription = statusChangesObservable
          ?.subscribe(() => {
            this._hasInvalidField = this.instances.filter(x => x.control)
              .findIndex(x => x.control.errors !== null && x.control.errors !== undefined) !== -1;
          });
        this._hookAbstractControlStatusChangesSubscription.add(statusChangesSubscription);
      }
    }
  }

  // Get instances
  public get instances(): MultipleValidationControlContext[] {
    return this._instances;
  }

  // Whether there is any invalid field or not.
  public get hasInvalidField(): boolean {
    return this._hasInvalidField;
  }

  // Collection of validation messages.
  public get validationMessages(): ValidationMessage[] {
    return this._validationMessages;
  }

  // tslint:disable-next-line:no-input-rename
  @Input('visibility-handler')
  public set visibilityHandler(value: ((ngControl: AbstractControl | NgControl) => boolean) | null) {
    this._visibilityHandler = value;
  }

  public get visibilityHandler(): (((ngControl: AbstractControl | NgControl) => boolean) | null) {
    return this._visibilityHandler;
  }


  //#endregion

  //#region Constructor

  public constructor(@Inject(MULTIPLE_VALIDATION_SUMMARIZER_SERVICE_PROVIDER)
                     protected readonly validationSummarizerService: IValidationSummarizerService,
                     @Inject(MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER)
                     protected readonly options: IMultipleValidationSummarizerOptions) {
    this._groupId = this.options?.groupId || uuid();
    this._visibilityHandler = options.visibilityHandler || null;
    this._validationItemTemplateContexts = [];
    this._hasInvalidField = false;
  }

  //#endregion

  //#region Life cycle hooks

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {

  }

  //#endregion

  //#region Methods

  //#endregion
}
