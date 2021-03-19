import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VmsWithBasicValidatorComponent} from './vms-with-basic-validator.component';

const routes: Routes = [
  {
    path: '',
    component: VmsWithBasicValidatorComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class VmsWithBasicValidatorRoutingModule {

}
