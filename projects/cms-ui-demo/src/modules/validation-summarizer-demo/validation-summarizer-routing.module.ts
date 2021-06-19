import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DemoLayoutComponent} from '../shared/demo-layout/demo-layout.component';
import {DemoLayoutModule} from '../shared/demo-layout/demo-layout.module';
import {ValidationSummarizerDemoComponent} from './validation-summarizer-demo.component';

//#region Properties

const routes: Routes = [
  {
    path: '',
    component: DemoLayoutComponent,
    children: [
      {
        path: '',
        component: ValidationSummarizerDemoComponent,
        children: [
          {
            path: 'message-template',
            loadChildren: () => import('./vsm-with-template/vsm-with-template.module')
              .then(m => m.VsmWithTemplateModule)
          },
          {
            path: 'visibility-handler',
            loadChildren: () => import('./vsm-with-visibility-handler/vsm-with-visibility-handler.module')
              .then(m => m.VsmWithVisibilityHandlerModule)
          },
          {
            path: 'template-driven',
            loadChildren: () => import('./vsm-with-template-driven/vsm-with-template-driven.module')
              .then(m => m.VsmWithTemplateDrivenModule)
          },
          {
            path: 'custom-validator',
            loadChildren: () => import('./vsm-with-custom-validator/vsm-with-custom-validator.module')
              .then(m => m.VsmWithCustomValidatorModule)
          },
          {
            path: 'child-validator-module',
            loadChildren: () => import('./vms-child-module/vms-child-module.module')
              .then(m => m.VmsChildModuleModule)
          },
          {
            path: 'validation-item-template',
            loadChildren: () => import('./vms-validation-item-template/vms-validation-item-template.module')
              .then(m => m.VmsValidationItemTemplateModule)
          },
          {
            path: '',
            loadChildren: () => import('./vms-with-basic-validator/vms-with-basic-validator.module')
              .then(m => m.VmsWithBasicValidatorModule)
          },
          {
            path: '**',
            redirectTo: ''
          }
        ]
      }
    ]
  }
];

//#endregion

//#region Module declaration

@NgModule({
  imports: [
    DemoLayoutModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ValidationSummarizerRoutingModule {
}

//#endregion
