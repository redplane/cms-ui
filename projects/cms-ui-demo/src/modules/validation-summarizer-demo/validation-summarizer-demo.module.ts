import {NgModule} from '@angular/core';
import {ValidationSummarizerRoutingModule} from './validation-summarizer-routing.module';
import {ValidationSummarizerDemoComponent} from './validation-summarizer-demo.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidationSummarizerModule} from '@cms-ui/core';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    ValidationSummarizerRoutingModule,
    ReactiveFormsModule,
    ValidationSummarizerModule.forRoot({
      messages: {
        notSmallerThan: 'MSG_CUSTOM_VALIDATOR_MESSAGE_NOT_SMALLER_THAN'
      },
      builtInMessageFallback: true
    }),
    CommonModule
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
