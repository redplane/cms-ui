import {NgModule} from '@angular/core';
import {VmsValidationItemTemplateComponent} from './vms-validation-item-template.component';
import {VmsValidationItemTemplateRoutingModule} from './vms-validation-item-template-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {VALIDATION_ITEM_TEMPLATE_BUILDERS_PROVIDER, ValidationSummarizerModule} from '@cms-ui/core';
import {TranslatedValidationSummarizerService} from '../../../services/implementations/translated-validation-summarizer.service';
import {HighlightJsModule} from 'ngx-highlight-js';
import {RequiredValidationItemTemplateComponent} from './item-templates/required-validation-item-template.component';
import {RequiredValidationItemTemplateBuilder} from './item-templates/required-validation.item-template-builder';

@NgModule({
  imports: [
    VmsValidationItemTemplateRoutingModule,
    TranslateModule,
    ReactiveFormsModule,

    ValidationSummarizerModule.forChild(TranslatedValidationSummarizerService, {
      useValidationItemBuilder: true,
      validationMessages: {
        isEven: 'MSG_VALUE_MUST_BE_EVEN'
      },
      maximumMessages: 1
    }),
    HighlightJsModule
  ],
  declarations: [
    RequiredValidationItemTemplateComponent,
    VmsValidationItemTemplateComponent
  ],
  providers: [
    {
      provide: VALIDATION_ITEM_TEMPLATE_BUILDERS_PROVIDER,
      useClass: RequiredValidationItemTemplateBuilder,
      multi: true
    }
  ],
  entryComponents: [
    RequiredValidationItemTemplateComponent
  ]
})
export class VmsValidationItemTemplateModule {

}
