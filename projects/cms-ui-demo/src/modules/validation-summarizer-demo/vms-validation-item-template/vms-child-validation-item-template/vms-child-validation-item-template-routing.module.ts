import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VmsChildValidationItemTemplateComponent} from './vms-child-validation-item-template.component';

const routes: Routes = [
  {
    path: '',
    component: VmsChildValidationItemTemplateComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class VmsChildValidationItemTemplateRoutingModule {

}
