import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {isNumber} from 'lodash-es';

export class NumericValidator {

  //#region Methods

  public static notSmallerThan(designatedMilestone: number | string): ValidatorFn {

    return (abstractControl: AbstractControl): ValidationErrors | null => {
      const value = parseInt(abstractControl.value as string, 10);

      // Skip if the value is not a number.
      if (!isNumber(value)) {
        return null;
      }

      if (!isNumber(designatedMilestone)) {
        return null;
      }

      // Validation is valid.
      if (value >= designatedMilestone) {
        return null;
      }

      return {
        notSmallerThan: designatedMilestone
      };
    };
  }

  // Validate the control value must not be exceed a specific number.
  public static notGreaterThan(designatedMilestone: number | string): ValidatorFn {

    return (abstractControl: AbstractControl): ValidationErrors | null => {
      const value = parseInt(abstractControl.value as string, 10);

      // Skip if the value is not a number.
      if (!isNumber(value)) {
        return null;
      }

      if (!isNumber(designatedMilestone)) {
        return null;
      }

      // Validation is valid.
      if (value <= designatedMilestone) {
        return null;
      }

      return {
        notGreaterThan: designatedMilestone
      };
    };
  }

  public static isEven(): ValidatorFn {
    return (abstractControl: AbstractControl): ValidationErrors | null => {
      const value = parseInt(abstractControl.value as string, 10);

      // Skip if the value is not a number.
      if (!isNumber(value)) {
        return null;
      }

      // Validation is valid.
      if (value % 2 === 0) {
        return null;
      }

      return {
        isEven: value
      };
    };
  }

  //#endregion

}
