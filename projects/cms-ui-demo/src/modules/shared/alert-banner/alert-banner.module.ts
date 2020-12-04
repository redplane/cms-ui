import {NgModule} from '@angular/core';
import {AlertBannerComponent} from './alert-banner.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AlertBannerComponent
  ],
  exports: [
    AlertBannerComponent
  ]
})
export class AlertBannerModule {

}
