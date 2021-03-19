import {NgModule} from '@angular/core';
import {VsmWithTemplateComponent} from './vsm-with-template.component';
import {VsmWithTemplateRoutingModule} from './vsm-with-template-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidationSummarizerModule} from '@cms-ui/core';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    VsmWithTemplateRoutingModule,
    ReactiveFormsModule,
    ValidationSummarizerModule,
    CommonModule
  ],
  declarations: [
    VsmWithTemplateComponent
  ]
})
export class VsmWithTemplateModule {

}
