import {ModuleWithProviders, NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValidationSummarizerComponent} from './validation-summarizer.component';
import {VALIDATION_SUMMARIZER_PROVIDER} from '../../../constants';
import {IValidationSummarizerService} from '../../../services';


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

  public static withRootValidationService(implementation: Type<IValidationSummarizerService>)
    : ModuleWithProviders<ValidationSummarizerModule> {
    return {
      ngModule: ValidationSummarizerModule,
      providers: [
        {
          provide: VALIDATION_SUMMARIZER_PROVIDER,
          useClass: implementation
        }
      ]
    };
  }

  //#endregion

}

//#endregion
