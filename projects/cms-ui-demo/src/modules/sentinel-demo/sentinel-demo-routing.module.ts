import {NgModule} from '@angular/core';
import {SentinelDemoComponent} from './sentinel-demo.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SentinelDemoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class SentinelDemoRoutingModule {

}
