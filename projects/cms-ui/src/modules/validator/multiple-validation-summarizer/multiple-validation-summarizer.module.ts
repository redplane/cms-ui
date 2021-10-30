import {NgModule} from '@angular/core';
import {MultipleValidationSummarizerComponent} from './multiple-validation-summarizer.component';
import {CommonModule} from '@angular/common';
import {MultipleValidationSummarizerItemDirective} from './multiple-validation-summarizer-item.directive';

@NgModule({
  declarations: [
    MultipleValidationSummarizerItemDirective,
    MultipleValidationSummarizerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MultipleValidationSummarizerComponent
  ]
})
export class MultipleValidationSummarizerModule {

}
