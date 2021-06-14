import {NgModule} from '@angular/core';
import {VsmWithTemplateDrivenRoutingModule} from './vsm-with-template-driven-routing.module';
import {VsmWithTemplateDrivenComponent} from './vsm-with-template-driven.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ValidationSummarizerModule} from '@cms-ui/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    VsmWithTemplateDrivenRoutingModule,
    ReactiveFormsModule,
    ValidationSummarizerModule,
    TranslateModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    VsmWithTemplateDrivenComponent
  ]
})
export class VsmWithTemplateDrivenModule {

}
