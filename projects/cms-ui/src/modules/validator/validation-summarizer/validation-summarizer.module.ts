import {ValidationSummarizerComponent} from './validation-summarizer.component';
import {ModuleWithProviders, NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VALIDATION_SUMMARIZER_MESSAGES, VALIDATION_SUMMARIZER_PROVIDER} from '../../../constants';
import {BasicValidationSummarizerService} from '../../../services/implementations/basic-validation-summarizer.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ValidationSummarizerComponent
  ],
  exports: [
    ValidationSummarizerComponent
  ],
  providers: [
    {
      provide: VALIDATION_SUMMARIZER_PROVIDER,
      useClass: BasicValidationSummarizerService
    }
  ]
})
export class ValidationSummarizerModule {

  public static forRoot(messages?: { [key: string]: string }): ModuleWithProviders<ValidationSummarizerModule> {
    return {
      ngModule: ValidationSummarizerModule,
      providers: [
        {
          provide: VALIDATION_SUMMARIZER_MESSAGES,
          useValue: messages
        }
      ]
    };
  }
}

//#endregion
