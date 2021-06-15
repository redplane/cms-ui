import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValidationSummarizerComponent} from './validation-summarizer.component';
import {
  VALIDATION_SUMMARIZER_BUILT_IN_MESSAGE_FALLBACK,
  VALIDATION_SUMMARIZER_MESSAGES,
  VALIDATION_SUMMARIZER_PROVIDER
} from '../../../constants';
import {IValidationSummarizerModuleOptions} from '../../../models/interfaces/validation-summarizers/validation-summarizer-module-options.interface';


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

        // Validation summarizer service registration.
        {
          provide: VALIDATION_SUMMARIZER_PROVIDER,
          useClass: options.validationService
        },

        // Whether to use built-in message as fallback or not ?
        {
          provide: VALIDATION_SUMMARIZER_BUILT_IN_MESSAGE_FALLBACK,
          useValue: options.useBuiltInValidationMessage || false
        },

        // Custom message registration
        {
          provide: VALIDATION_SUMMARIZER_MESSAGES,
          useValue: options.validationMessages || {}
        }
      ]
    };
  }

  //#endregion

}

//#endregion
