import {NgModule} from '@angular/core';
import {ValidationSummarizerRoutingModule} from './validation-summarizer-routing.module';
import {ValidationSummarizerDemoComponent} from './validation-summarizer-demo.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  VALIDATION_SUMMARIZER_BUILT_IN_MESSAGE_FALLBACK,
  VALIDATION_SUMMARIZER_MESSAGES,
  VALIDATION_SUMMARIZER_PROVIDER,
  ValidationSummarizerModule
} from '@cms-ui/core';
import {CommonModule} from '@angular/common';
import {TranslatedValidationSummarizerService} from '../../services/implementations/translated-validation-summarizer.service';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    ValidationSummarizerRoutingModule,
    ReactiveFormsModule,
    // ValidationSummarizerModule.forRoot({
    //   messages: {
    //     notSmallerThan: 'MSG_CUSTOM_VALIDATOR_MESSAGE_NOT_SMALLER_THAN'
    //   },
    //   builtInMessageFallback: true
    // }),
    TranslateModule.forChild(),
    ValidationSummarizerModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    ValidationSummarizerDemoComponent
  ],
  exports: [
    ValidationSummarizerDemoComponent
  ],
  providers: [
    {
      provide: VALIDATION_SUMMARIZER_PROVIDER,
      useClass: TranslatedValidationSummarizerService
    },
    {
      provide: VALIDATION_SUMMARIZER_BUILT_IN_MESSAGE_FALLBACK,
      useValue: true
    },
    {
      provide: VALIDATION_SUMMARIZER_MESSAGES,
      useValue: {
        notSmallerThan: 'MSG_CUSTOM_VALIDATOR_MESSAGE_NOT_SMALLER_THAN'
      }
    }
  ]
})
export class ValidationSummarizerDemoModule {

}
