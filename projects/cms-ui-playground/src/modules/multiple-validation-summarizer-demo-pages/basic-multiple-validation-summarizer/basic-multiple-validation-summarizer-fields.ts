import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TextValidator} from '../../../validators/text.validator';

export class BasicMultipleValidationSummarizerFields {

  //#region Static properties

  public static readonly nameControl = 'NAME';

  public static readonly passwordControl = 'PASSWORD';

  public static readonly confirmPasswordControl = 'CONFIRM_PASSWORD';

  //#endregion

  //#region Properties

  // tslint:disable-next-line:variable-name
  private readonly _formGroup: FormGroup;

  //#endregion

  //#region Constructor

  public constructor() {
    this._formGroup = new FormGroup({});

    const nameControl = new FormControl('', [Validators.required]);
    this._formGroup.addControl(BasicMultipleValidationSummarizerFields.nameControl, nameControl);

    const passwordControl = new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(3)
    ]);
    this._formGroup.addControl(BasicMultipleValidationSummarizerFields.passwordControl, passwordControl);

    const confirmPasswordControl = new FormControl('', [
      Validators.required,
      TextValidator.match(passwordControl)
    ]);
    this._formGroup.addControl(BasicMultipleValidationSummarizerFields.confirmPasswordControl, confirmPasswordControl);
  }

  //#endregion

  //#region Methods

  public toFormGroup(): FormGroup {
    return this._formGroup;
  }

  //#endregion

}
