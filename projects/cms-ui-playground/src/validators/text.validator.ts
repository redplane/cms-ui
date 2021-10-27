import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class TextValidator {

  //#region Methods

  public static match(designatedControl: AbstractControl): ValidatorFn {
    return (abstractControl: AbstractControl): ValidationErrors | null => {
      if (designatedControl.value === abstractControl.value) {
        return null;
      }

      return {
        mustMatch: true
      };
    };
  }

  //#endregion
}
