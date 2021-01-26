import {NgModule} from '@angular/core';
import {Navigator01Component} from './navigator-01.component';
import {CommonModule} from '@angular/common';
import {Navigator01RoutingModule} from './navigator-01-routing.module';

@NgModule({
  imports: [
    CommonModule,
    Navigator01RoutingModule
  ],
  declarations: [
    Navigator01Component
  ]
})
export class Navigator01Module {

}
