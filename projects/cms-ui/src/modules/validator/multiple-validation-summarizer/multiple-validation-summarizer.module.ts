import {NgModule} from '@angular/core';
import {MultipleValidationSummarizerComponent} from './multiple-validation-summarizer.component';
import {CommonModule} from '@angular/common';
import {MultipleValidationSummarizerItemDirective} from './multiple-validation-summarizer-item.directive';
import {ValidationSummarizerModule} from '../validation-summarizer';

@NgModule({
  declarations: [
    MultipleValidationSummarizerItemDirective,
    MultipleValidationSummarizerComponent
  ],
  imports: [
    CommonModule,
    ValidationSummarizerModule
  ],
  exports: [
    MultipleValidationSummarizerComponent
  ]
})
export class MultipleValidationSummarizerModule {

}
