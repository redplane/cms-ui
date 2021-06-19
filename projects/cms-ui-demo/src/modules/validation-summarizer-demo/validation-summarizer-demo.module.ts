import {NgModule} from '@angular/core';
import {ValidationSummarizerRoutingModule} from './validation-summarizer-routing.module';
import {ValidationSummarizerDemoComponent} from './validation-summarizer-demo.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SmartNavigatorModule, VALIDATION_SUMMARIZER_PROVIDER, ValidationSummarizerModule} from '@cms-ui/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {TranslatedValidationSummarizerService} from '../../services/implementations/translated-validation-summarizer.service';

@NgModule({
  imports: [
    ValidationSummarizerRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    ValidationSummarizerModule.forRoot({
      validatorProvider: {
        provide: VALIDATION_SUMMARIZER_PROVIDER,
        useClass: TranslatedValidationSummarizerService
      },
      validationMessages: {
        notSmallerThan: 'MSG_CUSTOM_VALIDATOR_MESSAGE_NOT_SMALLER_THAN'
      }
    }),
    SmartNavigatorModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    ValidationSummarizerDemoComponent
  ],
  exports: [
    ValidationSummarizerDemoComponent
  ]
})
export class ValidationSummarizerDemoModule {

}
