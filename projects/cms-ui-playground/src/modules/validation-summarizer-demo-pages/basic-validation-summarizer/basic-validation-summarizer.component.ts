import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BasicValidationSummarizerFields} from './basic-validation-summarizer-fields';
import {IValidationSummarizerService, VALIDATION_SUMMARIZER_SERVICE} from '@cms-ui/core';

@Component({
  selector: 'basic-validation-summarizer-demo',
  template: `
    <ng-container [formGroup]="formGroup">

      <label [validation-summarizer-class]
             [instance]="nameControl">Name</label>
      <div class="mb-2">
        <input class="form-control"
               [validation-summarizer-class]
               [formControl]="nameControl">
        <cms-validation-summarizer [instance]="nameControl"
                                   [label]="'Name'"
                                   [maximum-messages]="1"></cms-validation-summarizer>
      </div>

      <label [validation-summarizer-class]="['text-danger']"
             [instance]="formGroup.get(controlNames.password)">Password</label>
      <div class="mb-2">
        <input class="form-control"
               [validation-summarizer-class]="['border', 'border-danger']"
               [formControlName]="controlNames.password">
        <cms-validation-summarizer [instance]="formGroup.get(controlNames.password)"
                                   [label]="'Password'"
                                   [maximum-messages]="1"></cms-validation-summarizer>
      </div>

      <label [validation-summarizer-class]="['text-danger']"
             [instance]="formGroup.get(controlNames.confirmPassword)">Confirm password</label>
      <div class="mb-2">
        <input class="form-control"
               [validation-summarizer-control-watch]="formGroup.get(controlNames.password)"
               [formControlName]="controlNames.confirmPassword">
        <cms-validation-summarizer [instance]="formGroup.get(controlNames.confirmPassword)"
                                   [label]="'Confirm password'"
                                   [maximum-messages]="1"></cms-validation-summarizer>
      </div>
      <button class="btn btn-outline-primary" type="button" (click)="clickDoValidation()">Do validation</button>
    </ng-container>`
})
export class BasicValidationSummarizerComponent {

  //#region Properties

  // tslint:disable-next-line:variable-name
  private readonly _formGroup: FormGroup;

  // Name control.
  public readonly nameControl: FormControl;

  //#endregion

  //#region Accessors

  public get formGroup(): FormGroup {
    return this._formGroup;
  }

  //#endregion

  //#region Accessors

  public get controlNames(): typeof BasicValidationSummarizerFields {
    return BasicValidationSummarizerFields;
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(VALIDATION_SUMMARIZER_SERVICE)
                     protected readonly validationSummarizerService: IValidationSummarizerService) {

    this.nameControl = new FormControl(null, [Validators.required]);
    this._formGroup = new BasicValidationSummarizerFields().toFormGroup();
    this._formGroup.addControl('name', this.nameControl);
  }

  //#endregion

  //#region Methods

  public clickDoValidation(): void {
    this.validationSummarizerService.doFormControlsValidation(this.formGroup);
  }

  //#endregion

}
