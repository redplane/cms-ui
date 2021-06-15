import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IFormGroupSection} from '../../../interfaces/form-group-section.interface';
import {NumericValidator} from '../../../validators/numeric.validator';

export class VmsChildModuleControls implements IFormGroupSection {

  //#region Static properties

  public static readonly username = 'VMS_CHILD_MODULE-USERNAME';

  public static readonly age = 'VMS_CHILD_MODULE-AGE';

  //#endregion

  //#region Properties

  // Key to form control mapping.
  // tslint:disable-next-line:variable-name
  private readonly _keyToFormControl: { [key: string]: FormControl };

  // tslint:disable-next-line:variable-name
  private readonly _formGroup: FormGroup;

  //#endregion

  //#region Constructor

  public constructor() {
    this._formGroup = new FormGroup({});

    // Key to form control mapping.
    this._keyToFormControl = {};
    this._keyToFormControl[VmsChildModuleControls.username] = new FormControl(null, [Validators.required]);
    this._keyToFormControl[VmsChildModuleControls.age] = new FormControl(null, [
      Validators.required,
      NumericValidator.notSmallerThan(6),
      NumericValidator.notGreaterThan(10)
    ]);

    for (const key of Object.keys(this._keyToFormControl)) {
      this._formGroup.addControl(key, this._keyToFormControl[key]);
    }
  }

  //#endregion

  //#region Methods

  public toFormGroup(): FormGroup {
    return this._formGroup;
  }

  public loadControl(key: string): FormControl | null {
    if (!this._keyToFormControl) {
      return null;
    }

    return this._keyToFormControl[key];
  }

  //#endregion
}
