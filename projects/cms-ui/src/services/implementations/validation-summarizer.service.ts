import {AbstractControl, FormControl, FormControlDirective, FormGroup, NgControl, NgForm, ValidationErrors} from '@angular/forms';
import {merge as lodashMerge} from 'lodash-es';
import {IValidationSummarizerService} from '../interfaces';
import {cloneDeep} from 'lodash-es';
import {ValidationMessage} from '../../models/implementations/validation-message';

export abstract class ValidationSummarizerService implements IValidationSummarizerService {

  //#region Properties

  /*
  * Mapping between validator name and validation message.
  * */
  // tslint:disable-next-line:variable-name
  protected _validatorNameToValidationMessage: { [name: string]: string; };

  // Built in message which basically supported by plugin.
  // tslint:disable-next-line:variable-name
  protected _builtInMessages: { [name: string]: string };

  //#endregion

  //#region Constructor

  // tslint:disable-next-line:max-line-length
  public constructor(protected builtInMessages: { [key: string]: string },
                     validatorNameToValidationMessage?: { [name: string]: string; },
                     protected ableToBuiltInMessageFallback?: boolean) {

    this._builtInMessages = cloneDeep(builtInMessages);

    if (!validatorNameToValidationMessage) {
      this._validatorNameToValidationMessage = {};
      return;
    }

    this._validatorNameToValidationMessage = cloneDeep(validatorNameToValidationMessage);
  }

  //#endregion

  //#region Methods

  /*
  * Get a single control validation message.
  * */
  public loadControlValidationMessage(controlLabel: string, control: AbstractControl): ValidationMessage | null {
    const messages = this.loadControlValidationMessages(controlLabel, control);
    if (!messages) {
      return null;
    }

    return messages[0];
  }

  // Get all control validation messages.
  public loadControlValidationMessages(controlLabel: string, control: AbstractControl | NgControl | null): ValidationMessage[] | null {

    // Invalid control.
    if (!control) {
      return null;
    }

    // List of validation messages.
    const messages: ValidationMessage[] = [];
    // TODO: Not working for validators that are added later
    if (!control.errors || !control.errors) {
      return [];
    }

    const keys = Object.keys(control.errors);
    for (const key of keys) {
      if (!control.hasError(key)) {
        continue;
      }

      let boundValue = '';
      if (key === 'min' || key === 'max') {
        boundValue = control.errors[key][key];
      } else if (key === 'minlength' || key === 'maxlength') {
        boundValue = control.errors[key].requiredLength;
      }

      const additionalValue: { [key: string]: any } = {};

      if (key && key.length && boundValue) {
        additionalValue[key] = boundValue;
      }

      const message = this.buildValidationMessage(controlLabel, key, additionalValue);
      if (!message) {
        return null;
      }

      const validationMessage = new ValidationMessage(key, message);
      validationMessage.key = key;
      validationMessage.content = message;
      validationMessage.additionalValue[key] = boundValue;
      messages.push(validationMessage);
    }

    return messages;
  }

  // Whether component has been attached with any validators or not.
  public hasValidator(name: string, ngControl: NgControl): boolean {

    if (!ngControl) {
      return false;
    }

    const control = ngControl.control;
    if (!control) {
      return false;
    }

    if (!control.validator) {
      return false;
    }

    const validator = control.validator({} as AbstractControl);
    if (!validator) {
      return false;
    }

    return validator[name];
  }

  // Update the dictionary which is used for mapping validation property & validation message.
  public updateValidationMessageDictionary(validationMessageDictionary: { [p: string]: string; }): void {

    if (!validationMessageDictionary) {
      this._validatorNameToValidationMessage = {};
      return;
    }

    this._validatorNameToValidationMessage = {...validationMessageDictionary};
  }

  // Run validation on controls inside a form.
  public doFormControlsValidation(formGroup: FormGroup | NgForm): void {

    // Form group is not valid.
    if (!formGroup) {
      return;
    }

    // No control is found.
    const controls = formGroup.controls;
    if (!controls) {
      return;
    }

    const keys = Object.keys(controls);
    for (const key of keys) {
      const control = formGroup.controls[key];
      this.doControlValidation(control as any);
    }
  }

  // Do control validation
  public doControlValidation(control: AbstractControl | FormGroup): void {

    try {
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
        control.markAsDirty({onlySelf: true});
        control.updateValueAndValidity();

        return;
      }

      if (control instanceof FormControlDirective) {
        const formControlDirective = control as FormControlDirective;
        formControlDirective.control.markAsTouched({onlySelf: true});
        formControlDirective.control.markAsDirty({onlySelf: true});
        formControlDirective.control.updateValueAndValidity();
      }

      if (control instanceof FormGroup) {
        this.doFormControlsValidation(control);
      }
    } catch (exception) {
      // Suppress error.
    }
  }

  // Except empty string
  public isEmptyString(keyword: string): boolean {

    if (!keyword || keyword && keyword.trim() === '') {
      return false;
    }

    return true;
  }

  // Get control validation errors.
  public loadControlValidationErrors(control: AbstractControl | FormGroup): ValidationErrors | null {

    if (control instanceof FormControl) {
      return control.errors;
    }

    if (control instanceof FormControlDirective) {
      const formControlDirective = control as FormControlDirective;
      return formControlDirective.errors;
    }

    const validationErrors: ValidationErrors = {};

    if (control instanceof FormGroup) {
      const controlValidationErrors = this.loadFormControlsValidationError(control);
      lodashMerge(validationErrors, controlValidationErrors);
    }

    return validationErrors;
  }

  // Run validation on controls inside a form.
  public loadFormControlsValidationError(formGroup: FormGroup): ValidationErrors | null {

    // Form group is not valid.
    if (!formGroup) {
      return null;
    }

    // No control is found.
    const controls = formGroup.controls;
    if (!controls) {
      return null;
    }

    const validationErrors: ValidationErrors = {};
    const keys = Object.keys(controls);
    for (const key of keys) {
      const control = formGroup.controls[key];
      const validationError = this.loadControlValidationErrors(control);
      lodashMerge(validationErrors, validationError);
    }

    return validationErrors;
  }

  public shouldValidationSummarizerAbleToDisplayed(control: AbstractControl | NgControl): boolean {
    if (!control) {
      return false;
    }

    const ableToDisplay = control.invalid && (control.dirty || control.touched) === true;
    return true === ableToDisplay;
  }

  //#endregion

  //#region Internal methods

  // Build validation message from specific information.
  protected buildValidationMessage(controlLabel: string, validatorName: string, additionalValue: { [key: string]: string; }): string {
    if (!this._validatorNameToValidationMessage) {
      return '';
    }

    if (!this._validatorNameToValidationMessage[validatorName]) {

      if (this.ableToBuiltInMessageFallback && this._builtInMessages) {
        return this._builtInMessages[validatorName];
      }

      return '';
    }

    const initialMessage = this._validatorNameToValidationMessage[validatorName];
    // TODO: Interpolate the message.
    return initialMessage;
  }

  //#endregion
}
