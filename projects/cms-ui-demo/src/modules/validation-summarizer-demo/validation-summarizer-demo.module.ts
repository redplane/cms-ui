import {NgModule} from '@angular/core';
import {ValidationSummarizerRoutingModule} from './validation-summarizer-routing.module';
import {ValidationSummarizerDemoComponent} from './validation-summarizer-demo.component';
import {FormsModule} from '@angular/forms';
import {SmartNavigatorModule, VALIDATION_SUMMARIZER_SERVICE, ValidationSummarizerModule} from '@cms-ui/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {TranslatedValidationSummarizerService} from '../../services/implementations/translated-validation-summarizer.service';
import {DemoLayoutModule} from '../shared/demo-layout/demo-layout.module';
import {ModuleDescriptionModule} from '../shared/demo-layout/module-description/module-description.module';
import {DemoLayoutItemsComponent} from '../shared/demo-layout/demo-layout-items/demo-layout-items.component';
import {DEMO_LAYOUT_ITEMS_BUILDER_PROVIDER, DEMO_LAYOUT_ITEMS_TEMPLATE_TYPE_PROVIDER} from '../../constants/injectors';
import {VmsDemoItemsBuilder} from '../../services/implementations/demo-item-builders/vms-demo-items.builder';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    ValidationSummarizerRoutingModule,
    TranslateModule.forChild(),
    ValidationSummarizerModule.forRoot({
      validatorProvider: {
        provide: VALIDATION_SUMMARIZER_SERVICE,
        useClass: TranslatedValidationSummarizerService
      },
      validationMessages: {
        notSmallerThan: 'MSG_CUSTOM_VALIDATOR_MESSAGE_NOT_SMALLER_THAN'
      }
    }),
    SmartNavigatorModule,
    CommonModule,
    FormsModule,
    DemoLayoutModule,
    ModuleDescriptionModule,
    HttpClientModule
  ],
  declarations: [
    DemoLayoutItemsComponent,
    ValidationSummarizerDemoComponent
  ],
  exports: [
    ValidationSummarizerDemoComponent
  ],
  providers: [
    {
      provide: DEMO_LAYOUT_ITEMS_BUILDER_PROVIDER,
      useClass: VmsDemoItemsBuilder
    },
    {
      provide: DEMO_LAYOUT_ITEMS_TEMPLATE_TYPE_PROVIDER,
      useValue: DemoLayoutItemsComponent
    }
  ],
  entryComponents: [
    DemoLayoutItemsComponent
  ]
})
export class ValidationSummarizerDemoModule {

}
