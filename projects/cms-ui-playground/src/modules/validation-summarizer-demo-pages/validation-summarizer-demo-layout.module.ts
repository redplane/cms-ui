import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ValidationSummarizerDemoLayoutComponent} from './validation-summarizer-demo-layout.component';
import {VALIDATION_SUMMARIZER_PROVIDER, ValidationSummarizerModule} from '@cms-ui/core';
import {BasicValidationSummarizerService} from '../../services/basic-validation-summarizer.service';

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
    ValidationSummarizerModule.forRoot({
      validatorProvider: {
        provide: VALIDATION_SUMMARIZER_PROVIDER,
        useClass: BasicValidationSummarizerService
      }
    })
  ],
  exports: [
    RouterModule
  ]
})
export class ValidationSummarizerDemoLayoutModule {

}
