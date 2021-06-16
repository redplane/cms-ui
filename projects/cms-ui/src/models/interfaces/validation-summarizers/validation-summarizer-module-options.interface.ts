import {IValidationSummarizerOptions} from './validation-summarizer-options.interface';
import {AbstractControl, NgControl} from '@angular/forms';

export interface IValidationSummarizerModuleOptions
  extends IValidationSummarizerOptions {

  //#region Properties

  // Messages which will be used when the validation has issue.
  validationMessages?: { [key: string]: string };

  // Maximum message that will be displayed.
  maximumMessages?: number;

  // Group id of validation messages which placed inside the registered module.
  groupId?: string;

  // Handler for toggling validation summarizer visibility.
  visibilityHandler?: ((ngControl: AbstractControl | NgControl) => boolean) | null;

  //#endregion

}
