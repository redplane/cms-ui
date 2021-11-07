import {IMultipleValidationSummarizerOptions} from '../../models/interfaces/multiple-validation-summarizers/multiple-validation-summarizer-options.interface';

export interface IMultipleValidationSummarizerOptionProvider {

  //#region Methods

  // Get validation summarizer module option.
  getOption(): IMultipleValidationSummarizerOptions;

  //#endregion

}
