import {NgModule} from '@angular/core';
import {BasicValidationSummarizerComponent} from './basic-validation-summarizer.component';
import {ValidationSummarizerModule} from '@cms-ui/core';
import {AbstractControl, NgControl, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonValidatorModule} from '@cms-ui/core';

export function shouldValidationSummarizerVisible(ngControl: AbstractControl | NgControl): boolean {
  return ngControl.invalid || true;
}

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: BasicValidationSummarizerComponent
            }
        ]),
        ValidationSummarizerModule.forChild({
            defaultValidationClasses: ['text-danger'],
            defaultControlValidationClasses: ['border', 'border-danger']
        }),
        ReactiveFormsModule,
        CommonValidatorModule
    ],
  declarations: [
    BasicValidationSummarizerComponent
  ],
  exports: [
    BasicValidationSummarizerComponent
  ]
})
export class BasicValidationSummarizerModule {

}
