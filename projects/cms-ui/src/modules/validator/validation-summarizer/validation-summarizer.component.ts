/*
* This component is about receiving instance of another
* form control-modules which implement
* ControlValueAccessor interface to do validation.
* */
import {Component, Inject, InjectFlags, Injector, Input, TemplateRef} from '@angular/core';
import {NgControl} from '@angular/forms';
import {ValidationMessageModel} from '../models/validation-message.model';
import { IControlValidatorService } from '../interfaces/control-validator-service.interface';
import { CONTROL_VALIDATOR_SERVICE_INJECTOR } from '../constants/injection-token.constant';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[control-validator]',
  templateUrl: 'validation-summarizer.component.html',
  styleUrls: ['validation-summarizer.component.scss']
})
export class ValidationSummarizerComponent {

  //#region Properties

  // tslint:disable-next-line:variable-name
  protected _control: NgControl;

  // tslint:disable-next-line:variable-name
  protected _maxValidationMessages = 0;

  // Service for validating controls.
  protected controlValidatorService: IControlValidatorService;

  //#endregion

  //#region Accessors

  // Instance of the control that needs to be validated.
  @Input('control-instance')
  public set ngControl(control: NgControl) {
    this._control = control;
  }

  // Get the instance of control that needs to be validated.
  public get ngControl(): NgControl {
    return this._control;
  }

  // Label of control.
  // tslint:disable-next-line:no-input-rename
  @Input('control-label')
  public controlLabel: string;

  // Alternative template for validation summary.
  // tslint:disable-next-line:no-input-rename
  @Input('validation-template')
  public readonly alternativeTemplate: TemplateRef<any>;

  // Get template context.
  public get templateContext(): any {
    return {
      ngControl: this.ngControl,
      controlLabel: this.controlLabel,
      validationMessages: this.loadValidationMessages(this.maximumValidationMessages)
    };
  }

  /*
  * Maximum number of validation messages.
  * */
  public get maximumValidationMessages(): number {
    return this._maxValidationMessages;
  }

  /*
  * Maximum number of validation messages.
  * */
  @Input('maximum-validation-messages')
  public set maximumValidationMessage(value: number) {
    if (isNaN(value)) {
      this._maxValidationMessages = null;
      return;
    }

    this._maxValidationMessages = value;
  }

  //#endregion

  //#region Constructor

  public constructor(protected injector: Injector) {
    this.controlValidatorService = injector.get(CONTROL_VALIDATOR_SERVICE_INJECTOR, null, InjectFlags.Optional);
    this._maxValidationMessages = 0;
  }

  //#endregion

  //#region Methods

  protected loadValidationMessages(maximumValidationMessages: number | null): ValidationMessageModel[] {

    let messages = this.controlValidatorService
      .loadControlValidationMessages(this.controlLabel, this.ngControl);

    if (!messages) {
      return null;
    }

    if (isNaN(maximumValidationMessages)) {
      return messages;
    }

    if (maximumValidationMessages == null || maximumValidationMessages < 1) {
      return messages;
    }

    messages = messages.slice(0, maximumValidationMessages);
    return messages;
  }

  //#endregion
}
