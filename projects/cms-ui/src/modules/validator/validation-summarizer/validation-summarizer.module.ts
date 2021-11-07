import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValidationSummarizerComponent} from './validation-summarizer.component';
import {IValidationSummarizerModuleOptions} from '../../../models/interfaces/validation-summarizers/validation-summarizer-module-options.interface';
import {ValidationSummarizerItemDirective} from './validation-summarizer-item/validation-summarizer-item.directive';
import {VALIDATION_SUMMARIZER_OPTIONS} from '../../../constants/internal-injectors';
import {
  buildNullValidatorService,
  buildValidationSummarizerOptionProvider,
  buildValidatorService
} from '../../../factories/validation-summarizer.factory';
import {ValidationSummarizerClassDirective} from './validation-summarizer-directive/validation-summarizer-class.directive';
import {ValidationSummarizerControlClassDirective} from './validation-summarizer-directive/validation-summarizer-control-class.directive';
import {ValidationSummarizerControlWatchDirective} from './validation-summarizer-directive/validation-summarizer-control-watch.directive';
import {VALIDATION_SUMMARIZER_OPTION_PROVIDER} from '../../../constants';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ValidationSummarizerClassDirective,
    ValidationSummarizerControlClassDirective,
    ValidationSummarizerItemDirective,
    ValidationSummarizerControlWatchDirective,
    ValidationSummarizerComponent
  ],
  exports: [
    ValidationSummarizerClassDirective,
    ValidationSummarizerControlClassDirective,
    ValidationSummarizerControlWatchDirective,
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
          provide: VALIDATION_SUMMARIZER_OPTIONS,
          useValue: options,
          multi: true
        },

        // Validation summarizer option.
        {
          provide: VALIDATION_SUMMARIZER_OPTION_PROVIDER,
          useFactory: buildValidationSummarizerOptionProvider,
          deps: [VALIDATION_SUMMARIZER_OPTIONS]
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
          provide: VALIDATION_SUMMARIZER_OPTIONS,
          useValue: options,
          multi: true
        },
        {
          provide: VALIDATION_SUMMARIZER_OPTION_PROVIDER,
          useFactory: buildValidationSummarizerOptionProvider,
          deps: [VALIDATION_SUMMARIZER_OPTIONS]
        },

        // Validation summarizer service registration.
        options.validatorProvider || buildNullValidatorService()
      ]
    };
  }

  //#endregion

}

//#endregion
