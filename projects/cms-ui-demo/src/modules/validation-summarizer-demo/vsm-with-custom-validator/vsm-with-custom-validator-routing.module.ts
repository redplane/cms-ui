import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VsmWithCustomValidatorComponent} from './vsm-with-custom-validator.component';

const routes: Routes = [
  {
    path: '',
    component: VsmWithCustomValidatorComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class VsmWithCustomValidatorRoutingModule {

}
