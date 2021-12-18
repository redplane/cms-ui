import {ModuleWithProviders, NgModule} from '@angular/core';
import {ValidatorClassDirective} from './validation-summarizer-directive/validator-class.directive';
import {ValidatorControlClassDirective} from './validation-summarizer-directive/validator-control-class.directive';
import {ValidatorControlWatchDirective} from './validation-summarizer-directive/validator-control-watch.directive';
import {IValidationSummarizerModuleOptions} from '../../../models/interfaces/validation-summarizers/validation-summarizer-module-options.interface';
import {
  buildCommonValidatorOptions,
  buildCommonValidatorOptionsProvider,
  buildCommonValidatorService
} from '../../../factories/common-validator.factory';
import {NULL_COMMON_VALIDATOR_SERVICE} from '../../../constants/injectors/internal-injectors';

@NgModule({
  declarations: [
    ValidatorClassDirective,
    ValidatorControlClassDirective,
    ValidatorControlWatchDirective
  ],
  exports: [
    ValidatorClassDirective,
    ValidatorControlClassDirective,
    ValidatorControlWatchDirective
  ]
})
export class CommonValidatorModule {

  //#region Methods

  public static forRoot(
    options?: Partial<IValidationSummarizerModuleOptions>)
    : ModuleWithProviders<CommonValidatorModule> {
    return {
      ngModule: CommonValidatorModule,
      providers: [
        // Options.
        buildCommonValidatorOptions(options),

        // Options provider.
        buildCommonValidatorOptionsProvider(),

        // Build validator provider.
        options?.validatorProvider || buildCommonValidatorService()
      ]
    };
  }

  public static forChild(
    options?: IValidationSummarizerModuleOptions)
    : ModuleWithProviders<CommonValidatorModule> {
    return {
      ngModule: CommonValidatorModule,
      providers: [
        // Options.
        buildCommonValidatorOptions(options),

        // Options provider.
        buildCommonValidatorOptionsProvider(),

        // Build validator provider.
        options?.validatorProvider ? options.validatorProvider : {
          provide: NULL_COMMON_VALIDATOR_SERVICE,
          useValue: null
        }
      ]
    };
  }

  //#endregion
}
