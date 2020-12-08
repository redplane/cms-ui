import {NgModule} from '@angular/core';
import {ValidationSummarizerRoutingModule} from './validation-summarizer-routing.module';
import {ValidationSummarizerDemoComponent} from './validation-summarizer-demo.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidationSummarizerModule} from '@cms-ui/core';

@NgModule({
  imports: [
    ValidationSummarizerRoutingModule,
    ReactiveFormsModule,
    ValidationSummarizerModule.forRoot({
      messages: {
        notSmallerThan: 'MSG_CUSTOM_VALIDATOR_MESSAGE_NOT_SMALLER_THAN'
      },
      builtInMessageFallback: true
    })
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
