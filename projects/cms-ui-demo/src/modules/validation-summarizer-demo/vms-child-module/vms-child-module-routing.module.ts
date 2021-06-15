import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VmsChildModuleComponent} from './vms-child-module.component';

const routes: Routes = [
  {
    path: '',
    component: VmsChildModuleComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class VmsChildModuleRoutingModule {

}
