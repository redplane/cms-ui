import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FeatureSentinelDemoComponent} from './feature-sentinel-demo.component';
import {ExampleDescriptionLayoutComponent} from '../../shared/example-description-layout/example-description-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ExampleDescriptionLayoutComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class FeatureSentinelDemoRoutingModule {

}
