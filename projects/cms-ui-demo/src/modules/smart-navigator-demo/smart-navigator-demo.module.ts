import {NgModule} from '@angular/core';
import {SmartNavigatorDemoComponent} from './smart-navigator-demo.component';
import {CommonModule} from '@angular/common';
import {SmartNavigatorDemoRoutingModule} from './smart-navigator-demo-routing.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SmartNavigatorDemoRoutingModule,
    RouterModule
  ],
  declarations: [
    SmartNavigatorDemoComponent
  ]
})
export class SmartNavigatorDemoModule {

}
