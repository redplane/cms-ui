import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DemoPageComponent} from './demo-page.component';

const routes: Routes = [
  {
    path: '',
    component: DemoPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class DemoPageRoutingModule {

}
