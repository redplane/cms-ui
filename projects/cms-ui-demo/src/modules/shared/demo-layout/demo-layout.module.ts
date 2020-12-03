import {NgModule} from '@angular/core';
import {DemoLayoutComponent} from './demo-layout.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [
    DemoLayoutComponent
  ],
  exports: [
    DemoLayoutComponent
  ]
})
export class DemoLayoutModule {

}
