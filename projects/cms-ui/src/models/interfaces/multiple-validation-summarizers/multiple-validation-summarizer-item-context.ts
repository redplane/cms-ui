import {AbstractControl, NgControl} from '@angular/forms';

export class MultipleValidationSummarizerItemContext {

  //#region Constructor

  public constructor(public readonly label: string,
                     public readonly instance: AbstractControl | NgControl | null,
                     public readonly validationKey: string) {
  }

  //#endregion

}
