import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {UiModuleSectionPageComponent} from '../../pages/ui-module-page/ui-module-section-page/ui-module-section-page.component';
import {UiModuleSectionPageModule} from '../../pages/ui-module-page/ui-module-section-page/ui-module-section-page.module';
import {
  DEMO_LAYOUT_ITEMS_TEMPLATE_TYPE_PROVIDER, DEMO_PAGE_SERVICE_PROVIDER, DEMO_PAGE_TEMPLATE_PATH_PROVIDER,
  MODULE_DESCRIPTION_SERVICE_PROVIDER,
  MODULE_DESCRIPTION_TEMPLATE_PATH_PROVIDER
} from '../../../constants/injectors';
import {ModuleDescriptionService} from '../../../services/implementations/module-descriptions/module-description.service';
import {DemoPageService} from '../../../services/implementations/module-descriptions/demo-page.service';

@NgModule({
  imports: [
    CommonModule,
    UiModuleSectionPageModule,
    RouterModule.forChild([
      {
        path: '',
        component: UiModuleSectionPageComponent
      }
    ]),
    TranslateModule
  ],
  providers: [
    {
      provide: DEMO_PAGE_TEMPLATE_PATH_PROVIDER,
      useValue: '/assets/documents/cms-validation-summarizer/with-child-validator.html'
    },
    {
      provide: DEMO_PAGE_SERVICE_PROVIDER,
      useClass: DemoPageService
    }
  ]
})
export class VmsChildModuleModule {

}
