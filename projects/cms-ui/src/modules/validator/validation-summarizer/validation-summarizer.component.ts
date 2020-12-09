import {Component, Inject, InjectFlags, Injector, Input, TemplateRef} from '@angular/core';
import {AbstractControl, FormControl, NgControl} from '@angular/forms';
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
  protected _control: AbstractControl | null;

  // tslint:disable-next-line:variable-name
  protected _maxValidationMessages = 0;

  // Service for validating controls.
  protected validationSummarizerService: IValidationSummarizerService | null;

  // Handler for handling summarizer visibility.
  // tslint:disable-next-line:variable-name
  protected _visibilityHandler: ((ngControl: AbstractControl) => boolean) | null;

  //#endregion

  //#region Accessors

  // Instance of the control that needs to be validated.
  @Input('instance')
  public set ngControl(control: AbstractControl | null) {
    this._control = control;
  }

  // Get the instance of control that needs to be validated.
  public get ngControl(): AbstractControl | null {
    return this._control;
  }

  // Label of control.
  // tslint:disable-next-line:no-input-rename
  @Input('label')
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
  @Input('maximum-messages')
  public set maximumValidationMessage(value: number) {
    if (isNaN(value)) {
      this._maxValidationMessages = 0;
      return;
    }

    this._maxValidationMessages = value;
  }

  // tslint:disable-next-line:no-input-rename
  @Input('visibility-handler')
  public set visibilityHandler(value: ((ngControl: AbstractControl) => boolean) | null) {
    this._visibilityHandler = value;
  }

  public get visibilityHandler(): ((ngControl: AbstractControl) => boolean) | null {
    return this._visibilityHandler;
  }

  //#endregion

  //#region Constructor

  public constructor(protected injector: Injector) {
    this.validationSummarizerService = injector.get(VALIDATION_SUMMARIZER_PROVIDER, null, InjectFlags.Optional);
    this._maxValidationMessages = 0;
    this.controlLabel = '';
    this._control = null;
    this.alternativeTemplate = null;
    this._visibilityHandler = null;
  }

  //#endregion

  //#region Methods

  public ableToDisplayValidationMessages(ngControl: AbstractControl): boolean {

    if (!ngControl) {
      return false;
    }

    // Visibility handler is defined.
    if (this.visibilityHandler) {
      return this.visibilityHandler(ngControl);
    }

    if (!ngControl || !this.validationSummarizerService) {
      return false;
    }

    return this.validationSummarizerService.shouldValidationSummarizerAbleToDisplayed(ngControl);
  }

  //#endregion

  //#region Internal methods

  protected loadValidationMessages(maximumValidationMessages: number | null): ValidationMessage[] {

    if (!this.validationSummarizerService || !this.ngControl) {
      return [];
    }

    let messages = this.validationSummarizerService
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
