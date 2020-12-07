import {NgControl} from '@angular/forms';

export interface IValidationMessageService {

  //#region Methods

  // Get a single control validation message-modal.
  loadControlValidationMessage(controlLabel: string, control: NgControl): string;

  // Get all control validation messages.
  loadControlValidationMessages(controlLabel: string, control: NgControl): string[];

  // Get all available validators belong to control.
  hasValidatorAttached(name: string, ngControl: NgControl): boolean;

  // Whether validation message-modal should be displayed or not.
  shouldValidationMessageDisplayed(control: NgControl): boolean;

  //#endregion
}
