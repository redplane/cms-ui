import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule, Routes} from '@angular/router';
import {DemoPageComponent} from '../../shared/demo-layout/demo-page/demo-page.component';
import {DemoPageModule} from '../../shared/demo-layout/demo-page/demo-page.module';
import {DEMO_PAGE_SERVICE_PROVIDER, DEMO_PAGE_TEMPLATE_PATH_PROVIDER} from '../../../constants/injectors';
import {DemoPageService} from '../../../services/implementations/module-descriptions/demo-page.service';

const routes: Routes = [
  {
    path: '',
    component: DemoPageComponent
  }
];

@NgModule({
  imports: [
    DemoPageModule,
    RouterModule.forChild(routes),
    TranslateModule,
    CommonModule
  ],
  providers: [
    {
      provide: DEMO_PAGE_SERVICE_PROVIDER,
      useClass: DemoPageService
    },
    {
      provide: DEMO_PAGE_TEMPLATE_PATH_PROVIDER,
      useValue: '/assets/documents/cms-validation-summarizer/with-visibility-handler.html'
    }
  ]
})
export class VsmWithVisibilityHandlerModule {

}
