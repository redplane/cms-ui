import {AbstractControl, NgControl} from '@angular/forms';

export class MultipleValidationControlContext {

  public constructor(public readonly label: string,
                     public readonly control: AbstractControl | NgControl) {
  }

}
