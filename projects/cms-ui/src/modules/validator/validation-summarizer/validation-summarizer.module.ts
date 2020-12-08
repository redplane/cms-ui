import {ModuleWithProviders, NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VALIDATION_SUMMARIZER_MESSAGES, VALIDATION_SUMMARIZER_PROVIDER} from '../../../constants';
import {ValidationSummarizerService} from '../../../services';
import {ValidationSummarizerComponent} from './validation-summarizer.component';
import {builtInValidationMessages} from '../../../constants/built-in-validation-message.constant';
import {IValidationSummarizerSettings} from '../../../models/interfaces/validation-summarizer-settings.interface';

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
      useClass: ValidationSummarizerService
    }
  ]
})
export class ValidationSummarizerModule {

  public static forRoot(settings: IValidationSummarizerSettings): ModuleWithProviders<ValidationSummarizerModule> {
    return {
      ngModule: ValidationSummarizerModule,
      providers: [
        {
          provide: VALIDATION_SUMMARIZER_MESSAGES,
          useValue: (settings || {}).messages || builtInValidationMessages
        },
        {
          provide: VALIDATION_SUMMARIZER_PROVIDER,
          useValue: (settings || {}).implementation || ValidationSummarizerService
        }
      ]
    };
  }
}

//#endregion
