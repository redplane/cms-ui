import {NgModule} from '@angular/core';
import {Navigator03Component} from './navigator-03.component';
import {CommonModule} from '@angular/common';
import {Navigator03RoutingModule} from './navigator-03-routing.module';

@NgModule({
  imports: [
    CommonModule,
    Navigator03RoutingModule
  ],
  declarations: [
    Navigator03Component
  ]
})
export class Navigator03Module {

}
