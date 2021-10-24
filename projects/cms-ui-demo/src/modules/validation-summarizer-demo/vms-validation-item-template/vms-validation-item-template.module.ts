import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidationSummarizerModule} from '@cms-ui/core';
import {DEMO_PAGE_SERVICE_PROVIDER, DEMO_PAGE_TEMPLATE_PATH_PROVIDER} from '../../../constants/injectors';
import {DemoPageService} from '../../../services/implementations/module-descriptions/demo-page.service';
import {RouterModule} from '@angular/router';
import {DemoPageComponent} from '../../shared/demo-layout/demo-page/demo-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      component: DemoPageComponent
    }]),
    TranslateModule,
    ReactiveFormsModule,

    ValidationSummarizerModule.forChild({
      useValidationItemBuilder: true,
      validationMessages: {
        isEven: 'MSG_VALUE_MUST_BE_EVEN'
      },
      maximumMessages: 1
    })
  ],
  providers: [
    {
      provide: DEMO_PAGE_TEMPLATE_PATH_PROVIDER,
      useValue: '/assets/documents/cms-validation-summarizer/with-custom-validator.html'
    },
    {
      provide: DEMO_PAGE_SERVICE_PROVIDER,
      useClass: DemoPageService
    }
  ]
})
export class VmsValidationItemTemplateModule {

}
