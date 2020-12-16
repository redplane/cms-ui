import {InjectFlags, Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValidationSummarizerComponent} from './validation-summarizer.component';


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
}

//#endregion
