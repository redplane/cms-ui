import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SmartNavigatorDemoComponent} from './smart-navigator-demo.component';
import {DemoLayoutComponent} from '../shared/demo-layout/demo-layout.component';
import {DemoLayoutModule} from '../shared/demo-layout/demo-layout.module';

const routes: Routes = [
  {
    path: '',
    component: DemoLayoutComponent,
    children: [
      {
        path: '',
        component: SmartNavigatorDemoComponent,
        children: [
          {
            path: 'tab-01',
            loadChildren: () => import('./tabs/navigator-01/navigator-01.module')
              .then(m => m.Navigator01Module)
          },
          {
            path: 'tab-02',
            loadChildren: () => import('./tabs/navigator-02/navigator-02.module')
              .then(m => m.Navigator02Module)
          },
          {
            path: 'tab-03',
            loadChildren: () => import('./tabs/navigator-03/navigator-03.module')
              .then(m => m.Navigator03Module)
          }
        ]
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
export class SmartNavigatorDemoRoutingModule {

}
