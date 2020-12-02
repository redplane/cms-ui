import {NgModule} from '@angular/core';
import {MasterLayoutComponent} from './master-layout.component';
import {NavigationBarModule} from '../navigation-bar/navigation-bar.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    MasterLayoutComponent
  ],
  imports: [
    NavigationBarModule,
    RouterModule
  ],
  exports: [
    MasterLayoutComponent
  ]
})
export class MasterLayoutModule {
}
