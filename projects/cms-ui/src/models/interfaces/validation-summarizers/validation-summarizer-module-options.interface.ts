import {IValidationSummarizerOptions} from './validation-summarizer-options.interface';
import {AbstractControl, NgControl} from '@angular/forms';
import {Provider} from '@angular/core';

export interface IValidationSummarizerModuleOptions
  extends IValidationSummarizerOptions {

  //#region Properties

  // Service which is for doing validation.
  // If no service is specified.
  validatorProvider?: Provider;

  // Messages which will be used when the validation has issue.
  validationMessages?: { [key: string]: string };

  // Maximum message that will be displayed.
  maximumMessages?: number;

  // Group id of validation messages which placed inside the registered module.
  groupId?: string;

  // Handler for toggling validation summarizer visibility.
  visibilityHandler?: ((ngControl: AbstractControl | NgControl) => boolean) | null;

  // Classes which is used when validation classes must be applied to a control.
  defaultControlValidationClasses?: string[] | null;

  // Validation classes which is used when validation classes must be applied to an element.
  defaultValidationClasses?: string[] | null;

  //#endregion

}
