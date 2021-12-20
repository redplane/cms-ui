import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidationSummarizerModule} from '@cms-ui/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ToStaticFileContentModule} from '../../shared/pipe/to-static-file-content.module';
import {DEMO_PAGE_SERVICE_PROVIDER, DEMO_PAGE_TEMPLATE_PATH_PROVIDER} from '../../../constants/injectors';
import {DemoPageService} from '../../../services/implementations/module-descriptions/demo-page.service';
import {RouterModule, Routes} from '@angular/router';
import {UiModuleSectionPageComponent} from '../../pages/ui-module-page/ui-module-section-page/ui-module-section-page.component';
import {UiModuleSectionPageModule} from '../../pages/ui-module-page/ui-module-section-page/ui-module-section-page.module';

const routes: Routes = [
  {
    path: '',
    component: UiModuleSectionPageComponent
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
    UiModuleSectionPageModule
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
