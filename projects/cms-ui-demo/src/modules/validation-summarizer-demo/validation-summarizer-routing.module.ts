import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DemoLayoutComponent} from '../shared/demo-layout/demo-layout.component';
import {DemoLayoutModule} from '../shared/demo-layout/demo-layout.module';
import {ValidationSummarizerDemoComponent} from './validation-summarizer-demo.component';

//#region Properties

const routes: Routes = [
  {
    path: '',
    component: DemoLayoutComponent,
    children: [
      {
        path: '',
        component: ValidationSummarizerDemoComponent
      }
    ]
  }
];

//#endregion

//#region Module declaration

@NgModule({
  imports: [
    DemoLayoutModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ValidationSummarizerRoutingModule {
}

//#endregion
