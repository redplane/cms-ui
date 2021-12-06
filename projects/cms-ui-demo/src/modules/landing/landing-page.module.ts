import {NgModule} from '@angular/core';
import {LandingPageComponent} from './landing-page.component';
import {LandingPageRoutingModule} from './landing-page-routing.module';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {SmartNavigatorModule} from '@cms-ui/core';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    RouterModule,
    LandingPageRoutingModule,
    TranslateModule,
    SmartNavigatorModule,
    CommonModule
  ],
  declarations: [
    LandingPageComponent
  ],
  exports: [
    LandingPageComponent,
  ]
})
export class LandingPageModule {

}
