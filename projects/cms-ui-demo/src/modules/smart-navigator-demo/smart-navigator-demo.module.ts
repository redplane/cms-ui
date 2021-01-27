import {NgModule} from '@angular/core';
import {SmartNavigatorDemoComponent} from './smart-navigator-demo.component';
import {CommonModule} from '@angular/common';
import {SmartNavigatorDemoRoutingModule} from './smart-navigator-demo-routing.module';
import {RouterModule} from '@angular/router';
import {SmartNavigatorModule} from '@cms-ui/core';

@NgModule({
  imports: [
    CommonModule,
    SmartNavigatorDemoRoutingModule,
    SmartNavigatorModule,
    RouterModule
  ],
  declarations: [
    SmartNavigatorDemoComponent
  ],
  exports: [
    SmartNavigatorDemoComponent
  ]
})
export class SmartNavigatorDemoModule {

}
