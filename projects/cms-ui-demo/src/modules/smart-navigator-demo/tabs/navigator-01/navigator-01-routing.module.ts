import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Navigator01Component} from './navigator-01.component';

const routes: Routes = [
  {
    path: '',
    component: Navigator01Component
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class Navigator01RoutingModule {

}
