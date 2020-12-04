import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DemoLayoutComponent} from '../shared/demo-layout/demo-layout.component';
import {BannerDemoComponent} from './banner-demo.component';
import {DemoLayoutModule} from '../shared/demo-layout/demo-layout.module';

const routes: Routes = [
  {
    path: '',
    component: DemoLayoutComponent,
    children: [
      {
        path: '',
        component: BannerDemoComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    DemoLayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class BannerDemoRoutingModule {

}
