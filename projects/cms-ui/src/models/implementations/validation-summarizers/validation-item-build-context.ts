import {ValidationMessage} from './validation-message';
import {AbstractControl, NgControl} from '@angular/forms';

export class ValidationItemBuildContext {

  //#region Constructor

  public constructor(public readonly containerGroupId: string,
                     public readonly label: string | undefined,
                     public readonly validationMessage: ValidationMessage | undefined,
                     public readonly control: AbstractControl | NgControl | undefined | null) {
  }

  //#endregion

}
