import {ModuleWithProviders, NgModule} from '@angular/core';
import {MultipleValidationSummarizerComponent} from './multiple-validation-summarizer.component';
import {CommonModule} from '@angular/common';
import {MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS, MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER} from '../../../constants';
import {MultipleValidationSummarizerItemContextDirective} from './directives/multiple-validation-summarizer-item-context.directive';
import {buildMultipleValidationSummarizerService} from '../../../factories/multiple-validation-summarizer.factory';
import {IMultipleValidationSummarizerOptions} from '../../../models/interfaces/multiple-validation-summarizers/multiple-validation-summarizer-options.interface';
import {MultipleValidationSummarizerOptionProvider}
  from '../../../providers/implementations/multiple-validation-summarizer-option.provider';
import {ValidationSummarizerModule} from '../validation-summarizer';

@NgModule({
  declarations: [
    MultipleValidationSummarizerComponent,
    MultipleValidationSummarizerItemContextDirective
  ],
  imports: [
    CommonModule,
    ValidationSummarizerModule,
  ],
  exports: [
    MultipleValidationSummarizerComponent,
    MultipleValidationSummarizerItemContextDirective
  ]
})
export class MultipleValidationSummarizerModule {

  //#region For root method

  public static forRoot(
    options?: Partial<IMultipleValidationSummarizerOptions>)
    : ModuleWithProviders<MultipleValidationSummarizerModule> {
    return {
      ngModule: MultipleValidationSummarizerModule,
      providers: [

        // Option
        {
          provide: MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS,
          useValue: options,
          multi: true
        },

        // Option provider
        {
          provide: MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER,
          useClass: MultipleValidationSummarizerOptionProvider,
          deps: [MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS]
        },

        // Build service
        buildMultipleValidationSummarizerService()
      ]
    };
  }

  //#endregion

  //#region For child method

  public static forChild(
    options?: Partial<IMultipleValidationSummarizerOptions>)
    : ModuleWithProviders<MultipleValidationSummarizerModule> {
    return {
      ngModule: MultipleValidationSummarizerModule,
      providers: [

        // Option
        {
          provide: MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS,
          useValue: options,
          multi: true
        },

        // Option provider
        {
          provide: MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER,
          useClass: MultipleValidationSummarizerOptionProvider,
          deps: [MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS]
        },

        // Build service
        buildMultipleValidationSummarizerService()
      ]
    };
  }

  //#endregion
}

