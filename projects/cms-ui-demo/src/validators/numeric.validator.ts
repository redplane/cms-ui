import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {isNumber} from 'lodash-es';

export class NumericValidator {

  //#region Methods

  public static notSmallerThan(designatedMilestone: number): ValidatorFn | null {

    return (abstractControl: AbstractControl): ValidationErrors | null => {
      const value = abstractControl.value;

      // Skip if the value is not a number.
      if (!isNumber(value)) {
        return null;
      }

      if (!isNumber(designatedMilestone)) {
        return null;
      }

      // Validation is valid.
      if (value < designatedMilestone) {
        return null;
      }

      return {
        notSmallerThan: designatedMilestone
      };
    };
  }

  //#endregion

}
