import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ValidationSummarizerDemoLayoutComponent} from './validation-summarizer-demo-layout.component';
import {CommonValidatorModule, HasAnyValidatorsModule, ValidationSummarizerModule} from '@cms-ui/core';

@NgModule({
  declarations: [
    ValidationSummarizerDemoLayoutComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ValidationSummarizerDemoLayoutComponent,
        children: [
          {
            path: 'template-driven',
            loadChildren: () => import('./template-driven-validation-summarizer/template-driven-validation-summarizer.module')
              .then(m => m.TemplateDrivenValidationSummarizerModule)
          },
          {
            path: '',
            loadChildren: () => import('./basic-validation-summarizer/basic-validation-summarizer.module')
              .then(m => m.BasicValidationSummarizerModule)
          }
        ]
      }
    ]),
    HasAnyValidatorsModule.forRoot(),
    CommonValidatorModule.forRoot(),
    ValidationSummarizerModule.forRoot()
  ],
  exports: [
    RouterModule
  ]
})
export class ValidationSummarizerDemoLayoutModule {

}
