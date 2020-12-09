import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DemoLayoutModule} from '../shared/demo-layout/demo-layout.module';
import {DemoLayoutComponent} from '../shared/demo-layout/demo-layout.component';
import {DialogDemoComponent} from './dialog-demo.component';

//#region Routes

const routes: Routes = [
  {
    path: '',
    component: DemoLayoutComponent,
    children: [
      {
        path: '',
        component: DialogDemoComponent
      }
    ]
  }
];

//#endregion

//#region Module export

@NgModule({
  imports: [
    DemoLayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class DialogDemoRoutingModule {

}

//#endregion
