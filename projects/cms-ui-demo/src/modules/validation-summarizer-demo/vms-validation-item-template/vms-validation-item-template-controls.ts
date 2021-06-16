import {IFormGroupSection} from '../../../interfaces/form-group-section.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TYPE_KEY_TO_FORM_CONTROL} from '@cms-ui/core';
import {NumericValidator} from '../../../validators/numeric.validator';

export class VmsValidationItemTemplateControls implements IFormGroupSection {

  //#region Static properties

  public static readonly username = 'VMS_VALIDATION_ITEM_TEMPLATE-USERNAME';

  public static readonly age = 'VMS_VALIDATION_ITEM_TEMPLATE-AGE';

  //#endregion

  //#region Properties

  // tslint:disable-next-line:variable-name
  private readonly _formGroup: FormGroup;

  // Mapping between key & form control.
  // tslint:disable-next-line:variable-name
  private readonly _keyToFormControl: TYPE_KEY_TO_FORM_CONTROL;

  //#endregion

  //#region Accessors

  //#endregion

  //#region Constructor

  public constructor() {
    this._keyToFormControl = {};
    this._formGroup = new FormGroup({});

    this._keyToFormControl[VmsValidationItemTemplateControls.username] = new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(4)
    ]);
    this._keyToFormControl[VmsValidationItemTemplateControls.age] = new FormControl(null, [
      Validators.required,
      Validators.min(10),
      Validators.max(20),
      NumericValidator.isEven()
    ]);

    for (const key of Object.keys(this._keyToFormControl)) {
      this._formGroup.addControl(key, this._keyToFormControl[key]);
    }

  }

  //#endregion

  //#region Methods

  public loadControl(key: string): FormControl | null {
    if (!this._keyToFormControl) {
      return null;
    }

    return this._keyToFormControl[key];
  }

  public toFormGroup(): FormGroup {
    return this._formGroup;
  }

  //#endregion
}
