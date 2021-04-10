import {NgModule} from '@angular/core';
import {MasterLayoutComponent} from './master-layout.component';
import {NavigationBarModule} from '../navigation-bar/navigation-bar.module';
import {RouterModule} from '@angular/router';
import {ScrollTopModule} from 'src/modules/shared/scroll-top/scroll-top.module';

@NgModule({
  declarations: [
    MasterLayoutComponent
  ],
    imports: [
        NavigationBarModule,
        RouterModule,
        ScrollTopModule
    ],
  exports: [
    MasterLayoutComponent
  ]
})
export class MasterLayoutModule {
}
