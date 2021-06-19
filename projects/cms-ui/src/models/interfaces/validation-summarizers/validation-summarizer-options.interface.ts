import {IValidationSummarizerItemTemplateBuilder} from '../../../services/interfaces/validation-summarizers/validation-summarizer-item-template-builder.interface';

export interface IValidationSummarizerOptions {

  //#region Properties

  // Whether validation summarizer item builder or not.
  useValidationItemBuilder?: boolean;

  // The template builders to be used to generate validation item.
  itemTemplateBuilders?: IValidationSummarizerItemTemplateBuilder[];

  //#endregion

}
