import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {LandingPageComponent} from './landing-page.component';

//#region Routes

const routes: Route[] = [
  {
    path: '',
    component: LandingPageComponent
  }
];

//#endregion

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LandingPageRoutingModule {

}
