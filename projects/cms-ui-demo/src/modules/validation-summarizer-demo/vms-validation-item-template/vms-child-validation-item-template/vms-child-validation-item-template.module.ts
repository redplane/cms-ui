import {NgModule} from '@angular/core';
import {VmsChildValidationItemTemplateRoutingModule} from './vms-child-validation-item-template-routing.module';
import {VmsChildValidationItemTemplateComponent} from './vms-child-validation-item-template.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ValidationSummarizerModule} from '@cms-ui/core';
import {TranslatedValidationSummarizerService} from '../../../../services/implementations/translated-validation-summarizer.service';

@NgModule({
  imports: [
    VmsChildValidationItemTemplateRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,

    ValidationSummarizerModule.forChild({
      useValidationItemBuilder: false
    })
  ],
  declarations: [
    VmsChildValidationItemTemplateComponent
  ]
})
export class VmsChildValidationItemTemplateModule {

}
