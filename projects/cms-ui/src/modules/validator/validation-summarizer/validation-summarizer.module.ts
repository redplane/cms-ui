import {InjectFlags, Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  VALIDATION_SUMMARIZER_BUILT_IN_MESSAGE_FALLBACK,
  VALIDATION_SUMMARIZER_BUILT_IN_MESSAGES,
  VALIDATION_SUMMARIZER_MESSAGES,
  VALIDATION_SUMMARIZER_PROVIDER
} from '../../../constants';
import {IValidationSummarizerService, ValidationSummarizerService} from '../../../services';
import {builtInValidationMessages} from '../../../constants/built-in-validation-message.constant';
import {IValidationSummarizerSettings} from '../../../models/interfaces/validation-summarizer-settings.interface';
import {ValidationSummarizerComponent} from './validation-summarizer.component';

export function basicValidationSummarizerFactory(injector: Injector): IValidationSummarizerService {
  const builtInMessages = injector.get(VALIDATION_SUMMARIZER_BUILT_IN_MESSAGES, builtInValidationMessages);
  const validatorNameToValidationMessage = injector.get(VALIDATION_SUMMARIZER_MESSAGES, undefined, InjectFlags.Optional);
  const ableToBuiltInMessageFallback = injector.get(VALIDATION_SUMMARIZER_BUILT_IN_MESSAGE_FALLBACK, undefined, InjectFlags.Optional);
  return new ValidationSummarizerService(builtInMessages, validatorNameToValidationMessage, ableToBuiltInMessageFallback);
}

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
      useFactory: basicValidationSummarizerFactory,
      deps: [
        Injector
      ]
    }
  ]
})
export class ValidationSummarizerModule {

  public static forRoot(settings: IValidationSummarizerSettings): ModuleWithProviders<ValidationSummarizerModule> {
    return {
      ngModule: ValidationSummarizerModule,
      providers: [
        {
          provide: VALIDATION_SUMMARIZER_BUILT_IN_MESSAGES,
          useValue: builtInValidationMessages
        },
        {
          provide: VALIDATION_SUMMARIZER_MESSAGES,
          useValue: (settings || {}).messages || settings.messages
        },
        {
          provide: VALIDATION_SUMMARIZER_PROVIDER,
          useFactory: (settings || {}).implementation || basicValidationSummarizerFactory,
          deps: [
            Injector
          ]
        },
        {
          provide: VALIDATION_SUMMARIZER_BUILT_IN_MESSAGE_FALLBACK,
          useValue: (settings || {}).builtInMessageFallback || true
        }
      ]
    };
  }
}

//#endregion
