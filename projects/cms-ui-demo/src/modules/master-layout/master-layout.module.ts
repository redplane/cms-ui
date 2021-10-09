import {NgModule} from '@angular/core';
import {MasterLayoutComponent} from './master-layout.component';
import {NavigationBarModule} from './navigation-bar/navigation-bar.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AngularResizedEventModule} from 'angular-resize-event';

@NgModule({
  declarations: [
    MasterLayoutComponent
  ],
  imports: [
    NavigationBarModule,
    AngularResizedEventModule,
    RouterModule,
    CommonModule
  ],
  exports: [
    MasterLayoutComponent
  ]
})
export class MasterLayoutModule {
}
