import {IFormGroupSection} from '../../../../interfaces/form-group-section.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TYPE_KEY_TO_FORM_CONTROL} from '@cms-ui/core';

export class VmsChildValidationItemTemplateControls implements IFormGroupSection {

  //#region Static properties

  public static readonly childUsername = 'VmsChildValidationItemTemplateControls-childUsername';

  public static readonly childAge = 'VmsChildValidationItemTemplateControls-childAge';

  //#endregion

  //#region Properties

  // tslint:disable-next-line:variable-name
  private readonly _formGroup: FormGroup;

  // Mapping between key & form control.
  // tslint:disable-next-line:variable-name
  private readonly _keyToFormControl: TYPE_KEY_TO_FORM_CONTROL;

  //#endregion

  //#region Constructor

  public constructor() {

    this._keyToFormControl = {};
    this._keyToFormControl[VmsChildValidationItemTemplateControls.childUsername] = new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(5)
    ]);
    this._keyToFormControl[VmsChildValidationItemTemplateControls.childAge] = new FormControl(null, [
      Validators.required,
      Validators.min(2),
      Validators.max(20)
    ]);

    this._formGroup = new FormGroup({});
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
