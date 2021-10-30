import {ValidationMessage} from '../../../models';
import {AbstractControl, NgControl} from '@angular/forms';

export class MultipleValidationItemTemplateContext extends ValidationMessage {

  //#region Properties

  public readonly label: string;

  public readonly control: NgControl | AbstractControl;

  //#endregion

  //#region Constructor

  public constructor(
    controlLabel: string,
    control: AbstractControl | NgControl,
    key: string, content: string) {
    super(key, content);
    this.label = controlLabel;
    this.control = control;
  }

  //#endregion

}
