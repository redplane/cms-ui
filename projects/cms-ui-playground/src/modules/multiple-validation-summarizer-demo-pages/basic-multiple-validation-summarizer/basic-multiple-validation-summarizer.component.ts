import {Component, Inject} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BasicMultipleValidationSummarizerFields} from './basic-multiple-validation-summarizer-fields';
import {IValidationSummarizerService, MULTIPLE_VALIDATION_SUMMARIZER_SERVICE} from '@cms-ui/core';

@Component({
  selector: 'basic-multiple-validation-summarizer-demo',
  template: `
    <!--Multiple validation summarizer-->
    <cms-multiple-validation-summarizer>
      <!--Name-->
      <item-context [instance]="formGroup.get(controlNames.nameControl)"
                    [label]="'Name'"
                    [template]="validationTemplate">
      </item-context>
      <!--Password-->
      <item-context [instance]="formGroup.get(controlNames.passwordControl)"
                    [label]="'Password'"></item-context>
      <!--Confirm password-->
      <item-context [instance]="formGroup.get(controlNames.confirmPasswordControl)"
                    [label]="'Confirm password'"></item-context>
    </cms-multiple-validation-summarizer>
    <ng-container [formGroup]="formGroup">
      <!--Name-->
      <label [class.is-required]="formGroup.get(controlNames.nameControl) | hasValidators: ['required']">Name</label>
      <div class="mb-2">
        <input class="form-control"
               [formControlName]="controlNames.nameControl">
      </div>

      <!--Password-->
      <label [class.is-required]="formGroup.get(controlNames.passwordControl) | hasValidators: ['required']">Password</label>
      <div class="mb-2">
        <input class="form-control"
               [formControlName]="controlNames.passwordControl"
               [validation-summarizer-control-watch]="formGroup.get(controlNames.confirmPasswordControl)">
      </div>

      <!--Confirm password-->
      <label [class.is-required]="formGroup.get(controlNames.confirmPasswordControl) | hasValidators: ['required']">Confirm password</label>
      <div class="mb-2">
        <input class="form-control"
               [formControlName]="controlNames.confirmPasswordControl"
               [validation-summarizer-control-watch]="formGroup.get(controlNames.passwordControl)">
      </div>
      <button class="btn btn-outline-primary" type="button" (click)="clickDoValidation()">Do validation</button>
    </ng-container>

    <ng-template #validationTemplate
                 let-controlLabel="controlLabel"
                 let-validationMessages="validationMessages">
      <li *ngFor="let validationMessage of validationMessages">
        {{controlLabel}} {{validationMessage.content}}
      </li>
    </ng-template>`
})
export class BasicMultipleValidationSummarizerComponent {

  //#region Properties

  // tslint:disable-next-line:variable-name
  private readonly _formGroup: FormGroup;

  //#endregion

  //#region Accessors

  public get formGroup(): FormGroup {
    return this._formGroup;
  }


  //#endregion

  //#region Accessors

  public get controlNames(): typeof BasicMultipleValidationSummarizerFields {
    return BasicMultipleValidationSummarizerFields;
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(MULTIPLE_VALIDATION_SUMMARIZER_SERVICE)
                     protected readonly multipleValidationSummarizerService: IValidationSummarizerService) {
    this._formGroup = new BasicMultipleValidationSummarizerFields().toFormGroup();
  }

  //#endregion

  //#region Methods

  public clickDoValidation(): void {
    this.multipleValidationSummarizerService.doFormControlsValidation(this.formGroup);
  }

  //#endregion

}
