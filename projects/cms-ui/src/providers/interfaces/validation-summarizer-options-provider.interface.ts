import {IValidationSummarizerModuleOptions} from '../../models/interfaces/validation-summarizers/validation-summarizer-module-options.interface';

export interface IValidationSummarizerOptionProvider {

  //#region Methods

  // Get validation summarizer module option.
  getOption(): IValidationSummarizerModuleOptions;

  //#endregion

}
