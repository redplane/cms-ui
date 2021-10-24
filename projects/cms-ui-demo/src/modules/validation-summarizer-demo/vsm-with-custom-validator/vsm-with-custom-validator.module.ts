import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {DemoPageComponent} from '../../shared/demo-layout/demo-page/demo-page.component';
import {DemoPageModule} from '../../shared/demo-layout/demo-page/demo-page.module';
import {DEMO_PAGE_SERVICE_PROVIDER, DEMO_PAGE_TEMPLATE_PATH_PROVIDER} from '../../../constants/injectors';
import {DemoPageService} from '../../../services/implementations/module-descriptions/demo-page.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DemoPageComponent
      }
    ]),
    DemoPageModule,
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
      useValue: '/assets/documents/cms-validation-summarizer/with-custom-validator.html'
    }
  ]
})
export class VsmWithCustomValidatorModule {

}
