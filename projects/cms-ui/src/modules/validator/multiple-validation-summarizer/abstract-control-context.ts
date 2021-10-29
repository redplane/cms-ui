import {AbstractControl} from '@angular/forms';

export class AbstractControlContext {

  //#region Properties

  public readonly label: string;

  public readonly abstractControl: AbstractControl;

  public readonly validationMessages: string[];

  //#endregion

  //#region Constructor

  constructor(label: string, abstractControl: AbstractControl, validationMessages: string[]) {
    this.label = label;
    this.abstractControl = abstractControl;
    this.validationMessages = validationMessages;
  }

  //#endregion

}
