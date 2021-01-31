import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VsmWithTemplateDrivenComponent} from './vsm-with-template-driven.component';

const routes: Routes = [
  {
    path: '',
    component: VsmWithTemplateDrivenComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class VsmWithTemplateDrivenRoutingModule {

}
