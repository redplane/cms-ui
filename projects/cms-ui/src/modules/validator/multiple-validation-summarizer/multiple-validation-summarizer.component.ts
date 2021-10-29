import {ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {AbstractControl, NgControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {ValidationMessage} from '../../../models';
import {VALIDATION_SUMMARIZER_PROVIDER} from '../../../constants';
import {IValidationSummarizerService} from '../../../services';
import {AbstractControlContext} from './abstract-control-context';

@Component({
  selector: 'cms-multiple-validation-summarizer',
  templateUrl: 'multiple-validation-summarizer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleValidationSummarizerComponent implements OnInit, OnDestroy {

  //#region Properties

  // Abstract control contexts.
  private _abstractControlContexts: AbstractControlContext[] = [];

  // Validation messages.
  private _validationMessages: ValidationMessage[] = [];

  // Controls to be watched.
  private _abstractControls: AbstractControl[] = [];

  // Hook abstract value changes subscription.
  private _hookAbstractControlStatusChangesSubscription: Subscription = new Subscription();

  // Item template
  private _itemTemplate: TemplateRef<AbstractControlContext> | null = null;

  //#endregion

  //#region Accessors

  @Input('items')
  public set abstractControls(values: Array<AbstractControl | NgControl>) {
    this._hookAbstractControlStatusChangesSubscription?.unsubscribe();
    this._hookAbstractControlStatusChangesSubscription = new Subscription();

    if (!values || !values.length) {
      return;
    }

    for (const value of values) {

      let statusChangesObservable: Observable<any> | null = null;
      if (value instanceof AbstractControl) {
        statusChangesObservable = (value as AbstractControl).statusChanges;
      } else if (value instanceof NgControl) {
        statusChangesObservable = (value as NgControl).statusChanges;
      }

      const statusChangesSubscription = statusChangesObservable
        ?.subscribe(() => {
        });
      this._hookAbstractControlStatusChangesSubscription.add(statusChangesSubscription);
    }
  }

  // Collection of validation messages.
  public get validationMessages(): ValidationMessage[] {
    return this._validationMessages;
  }

  // Validation summarizer template.
  public get itemTemplate(): TemplateRef<AbstractControlContext> | null {
    return this._itemTemplate;
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(VALIDATION_SUMMARIZER_PROVIDER)
                     protected readonly validationSummarizerService: IValidationSummarizerService) {
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

    const ableToDisplay = ngControl.invalid && (ngControl.dirty || ngControl.touched) === true;
    return true === ableToDisplay;
  }

  //#endregion

  //#region Internal methods

  protected loadValidationMessages(context: AbstractControlContext, maximumValidationMessages: number | null): ValidationMessage[] {

    if (!this.validationSummarizerService || !this._abstractControls || !this._abstractControls.length) {
      return [];
    }

    const controlLabel = context.label;
    const ngControl = context.abstractControl;
    let messages = this.validationSummarizerService
      .loadControlValidationMessages(controlLabel, ngControl);

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
  private getContexts(): AbstractControlContext[] {
    return this._abstractControlContexts;
  }

  //#endregion
}
