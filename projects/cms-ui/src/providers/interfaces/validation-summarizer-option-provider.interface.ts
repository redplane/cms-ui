import {IValidationSummarizerModuleOptions} from '../../models';

export interface IValidationSummarizerOptionProvider {

  //#region Methods

  // Get validation summarizer module option.
  getOption(): IValidationSummarizerModuleOptions;

  //#endregion

}
