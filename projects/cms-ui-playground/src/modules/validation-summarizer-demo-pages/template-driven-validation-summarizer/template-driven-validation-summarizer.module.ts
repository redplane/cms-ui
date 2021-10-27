import {NgModule} from '@angular/core';
import {TemplateDrivenValidationSummarizerComponent} from './template-driven-validation-summarizer.component';
import {RouterModule} from '@angular/router';
import {ValidationSummarizerModule} from '@cms-ui/core';
import {FormsModule} from '@angular/forms';

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
    FormsModule
  ],
  declarations: [
    TemplateDrivenValidationSummarizerComponent
  ]
})
export class TemplateDrivenValidationSummarizerModule {

}
