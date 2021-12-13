import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValidationSummarizerComponent} from './validation-summarizer.component';
import {IValidationSummarizerModuleOptions} from '../../../models/interfaces/validation-summarizers/validation-summarizer-module-options.interface';
import {ValidationSummarizerItemDirective} from './validation-summarizer-item/validation-summarizer-item.directive';
import {
  buildValidationSummarizerOptions,
  buildValidationSummarizerOptionsProvider,
  buildValidationSummarizerService
} from '../../../factories/validation-summarizer.factory';
import {NULL_VALIDATION_SUMMARIZER_PROVIDER} from '../../../constants/injectors/internal-injectors';
import {ToTrustedHtmlPipeModule} from '../../../pipes/index';


@NgModule({
  imports: [
    CommonModule,
    ToTrustedHtmlPipeModule
  ],
  declarations: [
    ValidationSummarizerItemDirective,
    ValidationSummarizerComponent
  ],
  exports: [
    ValidationSummarizerItemDirective,
    ValidationSummarizerComponent
  ]
})
export class ValidationSummarizerModule {

  //#region Methods

  public static forRoot(
    options: Partial<IValidationSummarizerModuleOptions>)
    : ModuleWithProviders<ValidationSummarizerModule> {
    return {
      ngModule: ValidationSummarizerModule,
      providers: [
        // Build options
        buildValidationSummarizerOptions(options),

        // Build options provider.
        buildValidationSummarizerOptionsProvider(),

        // Build validator provider.
        options?.validatorProvider || buildValidationSummarizerService()
      ]
    };
  }

  public static forChild(
    options: IValidationSummarizerModuleOptions)
    : ModuleWithProviders<ValidationSummarizerModule> {
    return {
      ngModule: ValidationSummarizerModule,
      providers: [
        // Build options
        buildValidationSummarizerOptions(options),

        // Build options provider.
        buildValidationSummarizerOptionsProvider(),

        // Validation summarizer service registration.
        options.validatorProvider || {
          provide: NULL_VALIDATION_SUMMARIZER_PROVIDER,
          useValue: null
        }
      ]
    };
  }

  //#endregion

}

//#endregion
