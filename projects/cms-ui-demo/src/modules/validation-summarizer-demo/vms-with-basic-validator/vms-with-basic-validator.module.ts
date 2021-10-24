import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidationSummarizerModule} from '@cms-ui/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ToStaticFileContentModule} from '../../shared/pipe/to-static-file-content.module';
import {DEMO_PAGE_SERVICE_PROVIDER, DEMO_PAGE_TEMPLATE_PATH_PROVIDER} from '../../../constants/injectors';
import {DemoPageService} from '../../../services/implementations/module-descriptions/demo-page.service';
import {RouterModule, Routes} from '@angular/router';
import {DemoPageComponent} from '../../shared/demo-layout/demo-page/demo-page.component';
import {DemoPageModule} from '../../shared/demo-layout/demo-page/demo-page.module';

const routes: Routes = [
  {
    path: '',
    component: DemoPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ValidationSummarizerModule,
    CommonModule,
    TranslateModule,
    ToStaticFileContentModule,
    DemoPageModule
  ],
  providers: [
    {
      provide: DEMO_PAGE_SERVICE_PROVIDER,
      useClass: DemoPageService
    },
    {
      provide: DEMO_PAGE_TEMPLATE_PATH_PROVIDER,
      useValue: '/assets/documents/cms-validation-summarizer/with-basic-validator.html'
    }
  ]
})
export class VmsWithBasicValidatorModule {

}
