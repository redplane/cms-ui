import {NgModule} from '@angular/core';
import {VmsValidationItemTemplateComponent} from './vms-validation-item-template.component';
import {VmsValidationItemTemplateRoutingModule} from './vms-validation-item-template-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {VALIDATION_ITEM_TEMPLATE_BUILDERS_PROVIDER, ValidationSummarizerModule} from '@cms-ui/core';
import {TranslatedValidationSummarizerService} from '../../../services/implementations/translated-validation-summarizer.service';
import {HighlightJsModule} from 'ngx-highlight-js';
import {CustomValidationItemTemplateComponent} from './item-templates/custom-validation-item-template.component';
import {CustomValidationItemTemplateBuilder} from './item-templates/custom-validation.item-template-builder';
import {DefaultValidationItemTemplateComponent} from './item-templates/default-validation-item-template.component';
import {DefaultValidationItemTemplateBuilder} from './item-templates/default-validation.item-template-builder';
import {RouterModule} from '@angular/router';

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
    HighlightJsModule,
    RouterModule
  ],
  declarations: [
    CustomValidationItemTemplateComponent,
    DefaultValidationItemTemplateComponent,
    VmsValidationItemTemplateComponent
  ],
  providers: [
    {
      provide: VALIDATION_ITEM_TEMPLATE_BUILDERS_PROVIDER,
      useClass: CustomValidationItemTemplateBuilder,
      multi: true
    },
    {
      provide: VALIDATION_ITEM_TEMPLATE_BUILDERS_PROVIDER,
      useClass: DefaultValidationItemTemplateBuilder,
      multi: true
    }
  ],
  entryComponents: [
    CustomValidationItemTemplateComponent,
    DefaultValidationItemTemplateComponent
  ]
})
export class VmsValidationItemTemplateModule {

}
