import {NgModule} from '@angular/core';
import {VsmWithCustomValidatorRoutingModule} from './vsm-with-custom-validator-routing.module';
import {VsmWithCustomValidatorComponent} from './vsm-with-custom-validator.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ValidationSummarizerModule} from '@cms-ui/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    VsmWithCustomValidatorRoutingModule,
    ReactiveFormsModule,
    ValidationSummarizerModule,
    TranslateModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    VsmWithCustomValidatorComponent
  ]
})
export class VsmWithCustomValidatorModule {

}
