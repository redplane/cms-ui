import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValidationSummarizerComponent} from './validation-summarizer.component';
import {VALIDATION_SUMMARIZER_OPTION_PROVIDER, VALIDATION_SUMMARIZER_PROVIDER} from '../../../constants';
import {IValidationSummarizerModuleOptions} from '../../../models/interfaces/validation-summarizers/validation-summarizer-module-options.interface';
import {ValidationSummarizerItemDirective} from './validation-summarizer-item/validation-summarizer-item.directive';
import {VALIDATION_SUMMARIZER_OPTION} from '../../../constants/internal-injectors';
import {
  buildNullValidatorService,
  buildValidationSummarizerOptionProvider,
  buildValidatorService
} from '../../../factories/validation-summarizer.factory';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ValidationSummarizerItemDirective,
    ValidationSummarizerComponent
  ],
  exports: [
    ValidationSummarizerComponent
  ]
})
export class ValidationSummarizerModule {

  //#region Methods

  public static forRoot(
    options: IValidationSummarizerModuleOptions)
    : ModuleWithProviders<ValidationSummarizerModule> {
    return {
      ngModule: ValidationSummarizerModule,
      providers: [

        // Custom partial option providers.
        {
          provide: VALIDATION_SUMMARIZER_OPTION,
          useValue: options,
          multi: true
        },

        // Validation summarizer option.
        {
          provide: VALIDATION_SUMMARIZER_OPTION_PROVIDER,
          useFactory: buildValidationSummarizerOptionProvider,
          deps: [VALIDATION_SUMMARIZER_OPTION]
        },

        // Build validator provider.
        options.validatorProvider || buildValidatorService()
      ]
    };
  }

  public static forChild(
    options: IValidationSummarizerModuleOptions)
    : ModuleWithProviders<ValidationSummarizerModule> {
    return {
      ngModule: ValidationSummarizerModule,
      providers: [
        {
          provide: VALIDATION_SUMMARIZER_OPTION,
          useValue: options,
          multi: true
        },
        {
          provide: VALIDATION_SUMMARIZER_OPTION_PROVIDER,
          useFactory: buildValidationSummarizerOptionProvider,
          deps: [VALIDATION_SUMMARIZER_OPTION]
        },

        // Validation summarizer service registration.
        options.validatorProvider || buildNullValidatorService()
      ]
    };
  }

  //#endregion

}

//#endregion
