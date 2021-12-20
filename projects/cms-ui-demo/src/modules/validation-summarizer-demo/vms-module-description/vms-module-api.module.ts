import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UiModuleSectionPageComponent} from '../../pages/ui-module-page/ui-module-section-page/ui-module-section-page.component';
import {DEMO_PAGE_SERVICE_PROVIDER, DEMO_PAGE_TEMPLATE_PATH_PROVIDER} from '../../../constants/injectors';
import {DemoPageService} from '../../../services/implementations/module-descriptions/demo-page.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: UiModuleSectionPageComponent
      }
    ])
  ],
  providers: [
    {
      provide: DEMO_PAGE_SERVICE_PROVIDER,
      useClass: DemoPageService
    },
    {
      provide: DEMO_PAGE_TEMPLATE_PATH_PROVIDER,
      useValue: '/assets/documents/cms-validation-summarizer/module-api.html'
    }
  ]
})
export class VmsModuleApiModule {
}
