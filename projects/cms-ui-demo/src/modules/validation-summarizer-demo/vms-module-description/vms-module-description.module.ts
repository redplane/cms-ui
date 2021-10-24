import {NgModule} from '@angular/core';
import {
  MODULE_DESCRIPTION_SERVICE_PROVIDER,
  MODULE_DESCRIPTION_TEMPLATE_PATH_PROVIDER
} from '../../../constants/injectors';
import {ModuleDescriptionService} from '../../../services/implementations/module-descriptions/module-description.service';
import {RouterModule} from '@angular/router';
import {ModuleDescriptionModule} from '../../shared/demo-layout/module-description/module-description.module';

@NgModule({
  imports: [
    ModuleDescriptionModule,
    RouterModule.forChild([
      {
        path: 'api',
        loadChildren: () => import('./vms-module-api.module').then(m => m.VmsModuleApiModule)
      },
      {
        path: '',
        component: ModuleDescriptionService
      }
    ])
  ],
  providers: [
    {
      provide: MODULE_DESCRIPTION_TEMPLATE_PATH_PROVIDER,
      useValue: '/assets/documents/cms-validation-summarizer/module-description.html'
    },
    {
      provide: MODULE_DESCRIPTION_SERVICE_PROVIDER,
      useClass: ModuleDescriptionService
    }
  ]
})
export class VmsModuleDescriptionModule {

}
