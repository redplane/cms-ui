import {Injector, ModuleWithProviders, NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValidationSummarizerComponent} from './validation-summarizer.component';
import {VALIDATION_SUMMARIZER_MODULE_OPTIONS_PROVIDER, VALIDATION_SUMMARIZER_PROVIDER} from '../../../constants';
import {IValidationSummarizerModuleOptions} from '../../../models/interfaces/validation-summarizers/validation-summarizer-module-options.interface';
import {buildChildValidationSummarizerOptions,} from '../../../factories/validation-summarizer.factory';
import {VALIDATION_SUMMARIZER_CHILD_MODULE_OPTIONS_PROVIDER} from '../../../constants/internal-injectors';
import {ValidationSummarizerItemDirective} from './validation-summarizer-item/validation-summarizer-item.directive';
import {IValidationSummarizerService} from '../../../services';

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

        // Custom message registration
        {
          provide: VALIDATION_SUMMARIZER_MODULE_OPTIONS_PROVIDER,
          useValue: options
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
          provide: VALIDATION_SUMMARIZER_CHILD_MODULE_OPTIONS_PROVIDER,
          useValue: options
        },

        {
          provide: VALIDATION_SUMMARIZER_MODULE_OPTIONS_PROVIDER,
          useFactory: buildChildValidationSummarizerOptions,
          deps: [Injector, VALIDATION_SUMMARIZER_CHILD_MODULE_OPTIONS_PROVIDER]
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
