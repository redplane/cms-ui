import {AbstractControl, FormControl, FormControlDirective, FormGroup, NgControl, NgForm, ValidationErrors} from '@angular/forms';
import {ValidationMessage} from '../../../models/implementations/validation-summarizers/validation-message';
import {Observable, Subject} from 'rxjs';

export interface IValidationSummarizerService {

  //#region Methods

  // Get a single control validation message.
  loadControlValidationMessage(controlLabel: string, control: AbstractControl): ValidationMessage | null;

  // Get all control validation messages.
  loadControlValidationMessages(controlLabel: string, control: AbstractControl | NgControl | null): ValidationMessage[] | null;

  // Get all available validators belong to control.
  hasValidator(name: string, ngControl: NgControl): boolean;

  // Update a dictionary which is used for formatting validation message.
  // key: Validation property (required, min, max, ....)
  // value: Template of message that will be displayed on the screen.
  // tslint:disable-next-line: whitespace
  updateValidationMessageDictionary(validationMessageDictionary: { [key: string]: string; }): void;

  // Run validation on controls inside a form.
  doFormControlsValidation(formGroup: FormGroup | NgForm): void;

  // Mark control as dirty and trigger control validation.
  doControlValidation(control: AbstractControl | FormGroup | FormControlDirective): void;

  // Except empty string
  isEmptyString(keyword: string): boolean;

  // Get control validation errors.
  loadControlValidationErrors(control: AbstractControl | FormGroup): ValidationErrors | null;

  //#endregion
}
