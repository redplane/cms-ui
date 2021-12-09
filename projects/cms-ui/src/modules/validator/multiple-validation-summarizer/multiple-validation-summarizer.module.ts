import {ModuleWithProviders, NgModule} from '@angular/core';
import {MultipleValidationSummarizerComponent} from './multiple-validation-summarizer.component';
import {CommonModule} from '@angular/common';
import {MultipleValidationSummarizerItemContextDirective} from './directives/multiple-validation-summarizer-item-context.directive';
import {
  buildMultipleValidationSummarizerOptions,
  buildMultipleValidationSummarizerOptionsProvider,
  buildMultipleValidationSummarizerService
} from '../../../factories/multiple-validation-summarizer.factory';
import {ValidationSummarizerModule} from '../validation-summarizer/validation-summarizer.module';
import {IValidationSummarizerModuleOptions, IValidationSummarizerOptions} from '../../../models';

@NgModule({
  declarations: [
    MultipleValidationSummarizerComponent,
    MultipleValidationSummarizerItemContextDirective
  ],
  imports: [
    CommonModule,
    ValidationSummarizerModule
  ],
  exports: [
    MultipleValidationSummarizerComponent,
    MultipleValidationSummarizerItemContextDirective
  ]
})
export class MultipleValidationSummarizerModule {

  //#region For root method

  public static forRoot(
    options?: Partial<IValidationSummarizerModuleOptions>)
    : ModuleWithProviders<MultipleValidationSummarizerModule> {
    return {
      ngModule: MultipleValidationSummarizerModule,
      providers: [
        // Option
        buildMultipleValidationSummarizerOptions(options),

        // Option provider
        buildMultipleValidationSummarizerOptionsProvider(),

        // Build service
        buildMultipleValidationSummarizerService()
      ]
    };
  }

  //#endregion

  //#region For child method

  public static forChild(
    options?: Partial<IValidationSummarizerOptions>)
    : ModuleWithProviders<MultipleValidationSummarizerModule> {
    return {
      ngModule: MultipleValidationSummarizerModule,
      providers: [
        // Option
        buildMultipleValidationSummarizerOptions(options),

        // Option provider
        buildMultipleValidationSummarizerOptionsProvider(),

        // Build service
        buildMultipleValidationSummarizerService()
      ]
    };
  }

  //#endregion
}

