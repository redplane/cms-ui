import {NgModule} from '@angular/core';
import {LandingPageComponent} from './landing-page.component';
import {LandingPageRoutingModule} from './landing-page-routing.module';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        RouterModule,
        LandingPageRoutingModule
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
