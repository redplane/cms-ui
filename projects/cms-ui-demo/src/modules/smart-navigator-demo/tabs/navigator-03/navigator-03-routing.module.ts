import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Navigator03Component} from './navigator-03.component';

const routes: Routes = [
  {
    path: '',
    component: Navigator03Component
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class Navigator03RoutingModule {

}
