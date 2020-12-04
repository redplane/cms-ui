import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SpinnerDemoComponent} from './spinner-demo.component';
import {DemoLayoutComponent} from '../shared/demo-layout/demo-layout.component';

//#region Routes

const routes: Routes = [
  {
    path: '',
    component: DemoLayoutComponent,
    children: [
      {
        path: '',
        component: SpinnerDemoComponent
      }
    ]
  }
];

//#endregion

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class SpinnerDemoRoutingModule {

}
