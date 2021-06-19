import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ChildBannerDemoComponent} from './child-banner-demo.component';

const routes: Routes = [
  {
    path: '',
    component: ChildBannerDemoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ChildBannerDemoRoutingModule {
}
