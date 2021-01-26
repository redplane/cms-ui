import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Navigator02Component} from './navigator-02.component';

const routes: Routes = [
  {
    path: '',
    component: Navigator02Component
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class Navigator02RoutingModule {

}
