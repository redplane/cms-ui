import {NgModule} from '@angular/core';
import {TemplateDrivenValidationSummarizerComponent} from './template-driven-validation-summarizer.component';
import {RouterModule} from '@angular/router';
import {ValidationSummarizerModule} from '@cms-ui/core';
import {FormsModule} from '@angular/forms';
import {CommonValidatorModule} from '@cms-ui/core';
import {HasAnyValidatorsModule} from '@cms-ui/core';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: TemplateDrivenValidationSummarizerComponent
            }
        ]),
        ValidationSummarizerModule.forChild({
            defaultValidationClasses: ['text-danger'],
            defaultControlValidationClasses: ['border', 'border-danger']
        }),
        FormsModule,
        CommonValidatorModule,
        HasAnyValidatorsModule
    ],
  declarations: [
    TemplateDrivenValidationSummarizerComponent
  ]
})
export class TemplateDrivenValidationSummarizerModule {

}
