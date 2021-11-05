import {NgModule} from '@angular/core';
import {BasicMultipleValidationSummarizerComponent} from './basic-multiple-validation-summarizer.component';
import {ValidationSummarizerModule} from '@cms-ui/core';
import {AbstractControl, NgControl, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MultipleValidationSummarizerModule} from '../../../../../cms-ui/src/modules/validator/multiple-validation-summarizer/multiple-validation-summarizer.module';

export function shouldValidationSummarizerVisible(ngControl: AbstractControl | NgControl): boolean {
  return ngControl.invalid || true;
}

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: BasicMultipleValidationSummarizerComponent
      }
    ]),
    ValidationSummarizerModule.forChild({
      defaultValidationClasses: ['text-danger'],
      defaultControlValidationClasses: ['border', 'border-danger']
    }),
    ReactiveFormsModule,
    MultipleValidationSummarizerModule
  ],
  declarations: [
    BasicMultipleValidationSummarizerComponent
  ],
  exports: [
    BasicMultipleValidationSummarizerComponent
  ]
})
export class BasicValidationSummarizerModule {

}
