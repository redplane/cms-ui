import {Component, Inject} from '@angular/core';
import {Account} from '../../../models/account';
import {IValidationSummarizerService, VALIDATION_SUMMARIZER_PROVIDER} from '@cms-ui/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'template-driven-validation-summarizer',
  template: `
    <form class="container-fluid"
          (submit)="$event.preventDefault()"
          #f="ngForm">
      <label [validation-summarizer-class]
             [instance]="name">Name</label>
      <div class="mb-2">
        <input class="form-control"
               name="name"
               #name="ngModel"
               [validation-summarizer-class]
               [(ngModel)]="model.name" [required]="true">
        <cms-validation-summarizer [instance]="name"
                                   [label]="'Name'"
                                   [maximum-messages]="1"></cms-validation-summarizer>
      </div>

      <label [validation-summarizer-class]="['text-danger']"
             [instance]="password">Password</label>
      <div class="mb-2">
        <input class="form-control"
               name="password"
               #password="ngModel"
               [validation-summarizer-class]="['border', 'border-danger']"
               [(ngModel)]="model.password" [required]="true">
        <cms-validation-summarizer [instance]="password"
                                   [label]="'Password'"
                                   [maximum-messages]="1"></cms-validation-summarizer>
      </div>


      <button class="btn btn-outline-primary" type="button" (click)="clickDoValidation(f)">Do validation</button>
    </form>
  `
})
export class TemplateDrivenValidationSummarizerComponent {

  //#region Properties

  public readonly model: Account;

  //#endregion

  //#region Constructor

  public constructor(@Inject(VALIDATION_SUMMARIZER_PROVIDER) protected readonly validationSummarizerService: IValidationSummarizerService) {
    this.model = new Account();
  }

  //#endregion

  //#region Methods

  public clickDoValidation(ngForm: NgForm): void {
    this.validationSummarizerService.doFormControlsValidation(ngForm);
  }

  //#endregion
}
