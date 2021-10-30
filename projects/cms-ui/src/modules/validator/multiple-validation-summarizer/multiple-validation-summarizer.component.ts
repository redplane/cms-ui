import {ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {AbstractControl, NgControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {ValidationMessage} from '../../../models';
import {
  MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER,
  MULTIPLE_VALIDATION_SUMMARIZER_SERVICE_PROVIDER
} from '../../../constants';
import {IValidationSummarizerService} from '../../../services';
import {MultipleValidationTemplateContext} from './multiple-validation-template-context';
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
  private _abstractControlContexts: MultipleValidationTemplateContext[] = [];

  // Validation messages.
  private _validationMessages: ValidationMessage[] = [];

  // Hook abstract value changes subscription.
  private _hookAbstractControlStatusChangesSubscription: Subscription = new Subscription();

  // Item template
  private _itemTemplate: TemplateRef<MultipleValidationTemplateContext> | null = null;

  // Handler for handling summarizer visibility.
  // tslint:disable-next-line:variable-name
  private _visibilityHandler: ((ngControl: AbstractControl | NgControl) => boolean) | null;

  // Validation item template context.
  private _validationItemTemplateContexts: MultipleValidationItemTemplateContext[];

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
  @Input('items')
  public set abstractControls(items: MultipleValidationControlContext[]) {
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
          });
        this._hookAbstractControlStatusChangesSubscription.add(statusChangesSubscription);
      }
    }
  }

  // Collection of validation messages.
  public get validationMessages(): ValidationMessage[] {
    return this._validationMessages;
  }

  // Validation summarizer template.
  public get itemTemplate(): TemplateRef<MultipleValidationTemplateContext> | null {
    return this._itemTemplate;
  }

  // tslint:disable-next-line:no-input-rename
  @Input('visibility-handler')
  public set visibilityHandler(value: ((ngControl: AbstractControl | NgControl) => boolean) | null) {
    this._visibilityHandler = value;
  }

  public get validationItemTemplateContexts(): MultipleValidationItemTemplateContext[] {
    return this._validationItemTemplateContexts;
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
  }

  //#endregion

  //#region Life cycle hooks

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {

  }

  //#endregion

  //#region Methods

  public ableToDisplayValidationMessages(ngControl: AbstractControl | NgControl | null): boolean {

    if (!ngControl) {
      return false;
    }

    if (!ngControl) {
      return false;
    }

    if (!this._visibilityHandler) {
      return (ngControl.invalid && (ngControl.dirty || ngControl.touched) === true) || false;
    }

    return this._visibilityHandler(ngControl) || false;
  }

  protected loadValidationMessages(context: MultipleValidationTemplateContext,
                                   maximumValidationMessages: number | null): ValidationMessage[] {

    if (!this.validationSummarizerService) {
      return [];
    }

    const controlLabel = context.controlLabel;
    const abstractControl = context.abstractControl;

    if (!abstractControl) {
      return [];
    }

    let messages = this.validationSummarizerService
      .loadControlValidationMessages(controlLabel, abstractControl);

    if (!messages) {
      return [];
    }

    if (!maximumValidationMessages || isNaN(maximumValidationMessages)) {
      return messages;
    }

    if (maximumValidationMessages < 1) {
      return messages;
    }

    messages = messages.slice(0, maximumValidationMessages);
    return messages;
  }

  // Get validation template context.
  protected getContexts(): MultipleValidationTemplateContext[] {
    return this._abstractControlContexts;
  }

  //#endregion
}
