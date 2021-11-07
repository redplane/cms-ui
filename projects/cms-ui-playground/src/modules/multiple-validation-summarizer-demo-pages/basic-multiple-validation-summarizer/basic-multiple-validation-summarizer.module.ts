import {NgModule} from '@angular/core';
import {BasicMultipleValidationSummarizerComponent} from './basic-multiple-validation-summarizer.component';
import {MultipleValidationSummarizerModule} from '@cms-ui/core';
import {AbstractControl, NgControl, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';

export function shouldValidationSummarizerVisible(ngControl: AbstractControl | NgControl): boolean {
  return ngControl.invalid || true;
}

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: BasicMultipleValidationSummarizerComponent
            }
        ]),
        MultipleValidationSummarizerModule.forChild(),
        ReactiveFormsModule,
        TranslateModule.forChild(),
        CommonModule
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
