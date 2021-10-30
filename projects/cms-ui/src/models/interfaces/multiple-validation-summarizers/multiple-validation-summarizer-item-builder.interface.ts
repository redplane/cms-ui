import {TemplateRef} from '@angular/core';
import {MultipleValidationTemplateContext} from '../../../modules/validator/multiple-validation-summarizer/multiple-validation-template-context';

export interface IMultipleValidationSummarizerItemBuilder {

  //#region Methods

  // Build validation summarizer item asynchronously.
  buildAsync(key: string): Promise<TemplateRef<MultipleValidationTemplateContext>>;

  //#endregion

}
