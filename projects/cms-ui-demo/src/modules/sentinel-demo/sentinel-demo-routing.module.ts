import {NgModule} from '@angular/core';
import {SentinelDemoComponent} from './sentinel-demo.component';
import {RouterModule, Routes} from '@angular/router';
import {DemoLayoutComponent} from '../shared/demo-layout/demo-layout.component';
import {DemoLayoutModule} from '../shared/demo-layout/demo-layout.module';

const routes: Routes = [
  {
    path: 'feature-sentinel-demo',
    component: DemoLayoutComponent,
    loadChildren: () => import('./feature-sentinel-demo/feature-sentinel-demo.module')
      .then(m => m.FeatureSentinelDemoModule)
  },
  {
    path: '',
    component: SentinelDemoComponent
  }
];

@NgModule({
  imports: [
    DemoLayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class SentinelDemoRoutingModule {

}
