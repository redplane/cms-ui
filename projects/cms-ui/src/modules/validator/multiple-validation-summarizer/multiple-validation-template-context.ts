import {AbstractControl} from '@angular/forms';
import {MultipleValidationItemTemplateContext} from './multiple-validation-item-template-context';

export class MultipleValidationTemplateContext {

  //#region Properties

  public readonly controlLabel: string;

  public readonly abstractControl: AbstractControl;

  public readonly itemContexts: MultipleValidationItemTemplateContext[];

  //#endregion

  //#region Constructor

  constructor(controlLabel: string,
              abstractControl: AbstractControl,
              itemContexts: MultipleValidationItemTemplateContext[]) {
    this.controlLabel = controlLabel;
    this.abstractControl = abstractControl;
    this.itemContexts = itemContexts;

    if (this.itemContexts && this.itemContexts.length) {
      this.itemContexts = itemContexts.map(x => {
        return {
          ...x,
          control: controlLabel
        } as unknown as MultipleValidationItemTemplateContext;
      });
    }
  }

  //#endregion

}
