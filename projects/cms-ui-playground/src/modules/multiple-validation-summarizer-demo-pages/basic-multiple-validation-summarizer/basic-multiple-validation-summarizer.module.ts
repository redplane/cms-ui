import {NgModule} from '@angular/core';
import {BasicMultipleValidationSummarizerComponent} from './basic-multiple-validation-summarizer.component';
import {MultipleValidationSummarizerModule, ValidationSummarizerModule} from '@cms-ui/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {CommonValidatorModule} from '@cms-ui/core';
import {HasAnyValidatorsModule} from '@cms-ui/core';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: BasicMultipleValidationSummarizerComponent
      }
    ]),
    MultipleValidationSummarizerModule.forRoot(),
    CommonValidatorModule.forRoot(),
    ReactiveFormsModule,
    TranslateModule.forChild(),
    CommonModule,
    HasAnyValidatorsModule.forRoot()
  ],
  declarations: [
    BasicMultipleValidationSummarizerComponent
  ],
  exports: [
    BasicMultipleValidationSummarizerComponent
  ]
})
export class BasicMultipleValidationSummarizerModule {

}
