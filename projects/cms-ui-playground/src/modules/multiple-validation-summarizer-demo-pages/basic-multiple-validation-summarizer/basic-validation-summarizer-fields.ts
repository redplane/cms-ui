import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TextValidator} from '../../../validators/text.validator';

export class BasicValidationSummarizerFields {

  //#region Static properties

  public static readonly password = 'PASSWORD';

  public static readonly confirmPassword = 'CONFIRM_PASSWORD';

  //#endregion

  //#region Properties

  // tslint:disable-next-line:variable-name
  private readonly _formGroup: FormGroup;

  //#endregion

  //#region Constructor

  public constructor() {
    this._formGroup = new FormGroup({});

    const passwordControl = new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(3)
    ]);
    this._formGroup.addControl(BasicValidationSummarizerFields.password, passwordControl);

    const confirmPasswordControl = new FormControl('', [
      Validators.required,
      TextValidator.match(passwordControl)
    ]);
    this._formGroup.addControl(BasicValidationSummarizerFields.confirmPassword, confirmPasswordControl);
  }

  //#endregion

  //#region Methods

  public toFormGroup(): FormGroup {
    return this._formGroup;
  }

  //#endregion

}
