import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VmsValidationItemTemplateComponent} from './vms-validation-item-template.component';

const routes: Routes = [
  {
    path: '',
    component: VmsValidationItemTemplateComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class VmsValidationItemTemplateRoutingModule {

}
