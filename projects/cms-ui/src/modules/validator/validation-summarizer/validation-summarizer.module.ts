import {ModuleWithProviders, NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValidationSummarizerComponent} from './validation-summarizer.component';
import {VALIDATION_SUMMARIZER_OPTION_PROVIDER, VALIDATION_SUMMARIZER_PROVIDER} from '../../../constants';
import {IValidationSummarizerModuleOptions} from '../../../models/interfaces/validation-summarizers/validation-summarizer-module-options.interface';
import {ValidationSummarizerItemDirective} from './validation-summarizer-item/validation-summarizer-item.directive';
import {IValidationSummarizerService} from '../../../services';
import {VALIDATION_SUMMARIZER_OPTION} from '../../../constants/internal-injectors';
import {buildValidationSummarizerOptionProvider} from '../../../factories/validation-summarizer.factory';

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
    validationService: Type<IValidationSummarizerService>,
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

        {
          provide: VALIDATION_SUMMARIZER_OPTION_PROVIDER,
          useFactory: buildValidationSummarizerOptionProvider,
          deps: [VALIDATION_SUMMARIZER_OPTION]
        },

        // Validation summarizer service registration.
        {
          provide: VALIDATION_SUMMARIZER_PROVIDER,
          useClass: validationService
        },
      ]
    };
  }

  public static forChild(
    validationService: Type<IValidationSummarizerService>,
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
        {
          provide: VALIDATION_SUMMARIZER_PROVIDER,
          useClass: validationService
        }
      ]
    };
  }

  //#endregion

}

//#endregion
