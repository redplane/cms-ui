import {Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValidationSummarizerComponent} from './validation-summarizer.component';
import {
  VALIDATION_SUMMARIZER_BUILT_IN_MESSAGE_FALLBACK,
  VALIDATION_SUMMARIZER_MESSAGES,
  VALIDATION_SUMMARIZER_PROVIDER
} from '../../../constants';
import {IValidationSummarizerModuleOptions} from '../../../models/interfaces/validation-summarizers/validation-summarizer-module-options.interface';
import {
  buildChildValidationSummarizerMessageFallback,
  buildChildValidationSummarizerMessages,
} from '../../../factories/validation-summarizer.factory';
import {VALIDATION_SUMMARIZER_CHILD_OPTIONS_PROVIDER} from '../../../constants/internal-injectors';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ValidationSummarizerComponent
  ],
  exports: [
    ValidationSummarizerComponent
  ]
})
export class ValidationSummarizerModule {

  //#region Methods

  public static forRoot(options: IValidationSummarizerModuleOptions)
    : ModuleWithProviders<ValidationSummarizerModule> {
    return {
      ngModule: ValidationSummarizerModule,
      providers: [

        // Whether to use built-in message as fallback or not ?
        {
          provide: VALIDATION_SUMMARIZER_BUILT_IN_MESSAGE_FALLBACK,
          useValue: options.useBuiltInValidationMessage || false
        },

        // Custom message registration
        {
          provide: VALIDATION_SUMMARIZER_MESSAGES,
          useValue: options.validationMessages || {}
        },

        // Validation summarizer service registration.
        {
          provide: VALIDATION_SUMMARIZER_PROVIDER,
          useClass: options.validationService
        },
      ]
    };
  }

  public static forChild(options: IValidationSummarizerModuleOptions)
    : ModuleWithProviders<ValidationSummarizerModule> {
    return {
      ngModule: ValidationSummarizerModule,
      providers: [
        {
          provide: VALIDATION_SUMMARIZER_CHILD_OPTIONS_PROVIDER,
          useValue: options
        },

        // Validation summarizer messages.
        {
          provide: VALIDATION_SUMMARIZER_MESSAGES,
          useFactory: buildChildValidationSummarizerMessages,
          deps: [Injector, VALIDATION_SUMMARIZER_CHILD_OPTIONS_PROVIDER]
        },

        // Validation summarizer service registration.
        {
          provide: VALIDATION_SUMMARIZER_BUILT_IN_MESSAGE_FALLBACK,
          useFactory: buildChildValidationSummarizerMessageFallback,
          deps: [VALIDATION_SUMMARIZER_CHILD_OPTIONS_PROVIDER]
        },

        {
          provide: VALIDATION_SUMMARIZER_PROVIDER,
          useClass: options.validationService
        }
      ]
    };
  }

  //#endregion

}

//#endregion
