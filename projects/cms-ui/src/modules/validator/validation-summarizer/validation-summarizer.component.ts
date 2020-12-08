import {Component, Inject, InjectFlags, Injector, Input, TemplateRef} from '@angular/core';
import {FormControl, NgControl} from '@angular/forms';
import {VALIDATION_SUMMARIZER_PROVIDER} from '../../../constants';
import {ValidationMessage} from '../../../models';
import {IValidationSummarizerService} from '../../../services';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cms-validation-summarizer',
  templateUrl: 'validation-summarizer.component.html',
  styleUrls: ['validation-summarizer.component.scss']
})
export class ValidationSummarizerComponent {

  //#region Properties

  // tslint:disable-next-line:variable-name
  protected _control: NgControl | FormControl | null;

  // tslint:disable-next-line:variable-name
  protected _maxValidationMessages = 0;

  // Service for validating controls.
  protected controlValidatorService: IValidationSummarizerService | null;

  //#endregion

  //#region Accessors

  // Instance of the control that needs to be validated.
  @Input('control-instance')
  public set ngControl(control: NgControl | FormControl | null) {
    this._control = control;
  }

  // Get the instance of control that needs to be validated.
  public get ngControl(): NgControl | FormControl | null {
    return this._control;
  }

  // Label of control.
  // tslint:disable-next-line:no-input-rename
  @Input('control-label')
  public controlLabel: string;

  // Alternative template for validation summary.
  // tslint:disable-next-line:no-input-rename
  @Input('validation-template')
  public alternativeTemplate: TemplateRef<any> | null;

  // Get template context.
  public get templateContext(): any {
    return {
      ngControl: this.ngControl,
      controlLabel: this.controlLabel,
      validationMessages: this.loadValidationMessages(this.maximumValidationMessages)
    };
  }

  // Maximum number of validation messages.
  public get maximumValidationMessages(): number {
    return this._maxValidationMessages;
  }

  // Maximum number of validation messages.
  @Input('maximum-validation-messages')
  public set maximumValidationMessage(value: number) {
    if (isNaN(value)) {
      this._maxValidationMessages = 0;
      return;
    }

    this._maxValidationMessages = value;
  }

  //#endregion

  //#region Constructor

  public constructor(protected injector: Injector) {
    this.controlValidatorService = injector.get(VALIDATION_SUMMARIZER_PROVIDER, null, InjectFlags.Optional);
    this._maxValidationMessages = 0;
    this.controlLabel = '';
    this._control = null;
    this.alternativeTemplate = null;
  }

  //#endregion

  //#region Methods

  public ableToDisplayValidationMessages(ngControl: NgControl | FormControl | null): boolean {

    if (!ngControl || !this.controlValidatorService) {
      return false;
    }

    return this.controlValidatorService.shouldValidationSummarizerAbleToDisplayed(ngControl);
  }

  //#endregion

  //#region Internal methods

  protected loadValidationMessages(maximumValidationMessages: number | null): ValidationMessage[] {

    if (!this.controlValidatorService || !this.ngControl) {
      return [];
    }

    let messages = this.controlValidatorService
      .loadControlValidationMessages(this.controlLabel, this.ngControl);

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

  //#endregion
}
