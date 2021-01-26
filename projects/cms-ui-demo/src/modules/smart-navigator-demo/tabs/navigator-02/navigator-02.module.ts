import {NgModule} from '@angular/core';
import {Navigator02Component} from './navigator-02.component';
import {CommonModule} from '@angular/common';
import {Navigator02RoutingModule} from './navigator-02-routing.module';

@NgModule({
  imports: [
    CommonModule,
    Navigator02RoutingModule
  ],
  declarations: [
    Navigator02Component
  ]
})
export class Navigator02Module {

}
