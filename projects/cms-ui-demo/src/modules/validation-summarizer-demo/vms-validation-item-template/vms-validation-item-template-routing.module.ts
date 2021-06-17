import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VmsValidationItemTemplateComponent} from './vms-validation-item-template.component';

const routes: Routes = [
  {
    path: '',
    component: VmsValidationItemTemplateComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./vms-child-validation-item-template/vms-child-validation-item-template.module')
          .then(m => m.VmsChildValidationItemTemplateModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class VmsValidationItemTemplateRoutingModule {

}
