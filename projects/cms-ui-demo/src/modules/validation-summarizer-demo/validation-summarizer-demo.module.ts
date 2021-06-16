import {NgModule} from '@angular/core';
import {ValidationSummarizerRoutingModule} from './validation-summarizer-routing.module';
import {ValidationSummarizerDemoComponent} from './validation-summarizer-demo.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SmartNavigatorModule, ValidationSummarizerModule} from '@cms-ui/core';
import {CommonModule} from '@angular/common';
import {TranslatedValidationSummarizerService} from '../../services/implementations/translated-validation-summarizer.service';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    ValidationSummarizerRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    ValidationSummarizerModule.forRoot(TranslatedValidationSummarizerService, {
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
