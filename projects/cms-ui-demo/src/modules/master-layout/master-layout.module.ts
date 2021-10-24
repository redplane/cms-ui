import {NgModule} from '@angular/core';
import {MasterLayoutComponent} from './master-layout.component';
import {NavigationBarModule} from './navigation-bar/navigation-bar.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    MasterLayoutComponent
  ],
  imports: [
    NavigationBarModule,
    RouterModule,
    CommonModule
  ],
  exports: [
    MasterLayoutComponent
  ]
})
export class MasterLayoutModule {
}
