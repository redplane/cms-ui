import {NgModule} from '@angular/core';
import {LandingPageComponent} from './landing-page.component';
import {LandingPageRoutingModule} from './landing-page-routing.module';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {SmartNavigatorModule} from '@cms-ui/core';

@NgModule({
  imports: [
    RouterModule,
    LandingPageRoutingModule,
    TranslateModule,
    SmartNavigatorModule
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
