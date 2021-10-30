import {Directive, TemplateRef} from '@angular/core';
import {MultipleValidationTemplateContext} from './multiple-validation-template-context';

@Directive({
  selector: 'cms-multiple-validation-summarizer [validation-item]'
})
export class MultipleValidationSummarizerItemDirective {

  //#region Properties


  //#endregion

  //#region Constructor

  public constructor(public readonly templateRef: TemplateRef<MultipleValidationTemplateContext>) {
  }

  //#endregion

  //#region Methods

  //#endregion
}
