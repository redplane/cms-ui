import {Type} from '@angular/core';
import {IValidationSummarizerService} from '../../../services';

export interface IValidationSummarizerModuleOptions {

  //#region Properties

  // Validation service implementation.
  validationService: Type<IValidationSummarizerService>;

  // Whether built-in validation message is used or not.
  useBuiltInValidationMessage?: boolean;

  // Messages which will be used when the validation has issue.
  validationMessages?: {[key: string]: string};

  //#endregion

}
