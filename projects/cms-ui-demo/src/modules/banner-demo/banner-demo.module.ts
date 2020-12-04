import {NgModule} from '@angular/core';
import {BannerDemoRoutingModule} from './banner-demo-routing.module';
import {BannerDemoComponent} from './banner-demo.component';
import {BANNER_BUILDER_PROVIDER, BannerModule, WINDOW_PROVIDERS} from '@cms-ui/core';
import {AlertBannerContentBuilder} from '../../services/implementations/banners/alert-banner-content.builder';
import {InfoBannerContentBuilder} from '../../services/implementations/banners/info-banner-content.builder';

@NgModule({
  imports: [
    BannerModule,
    BannerDemoRoutingModule
  ],
  declarations: [
    BannerDemoComponent
  ],
  exports: [
    BannerDemoRoutingModule
  ],
  providers: [
    WINDOW_PROVIDERS,
    {
      provide: BANNER_BUILDER_PROVIDER,
      useClass: AlertBannerContentBuilder,
      multi: true
    },
    {
      provide: BANNER_BUILDER_PROVIDER,
      useClass: InfoBannerContentBuilder,
      multi: true
    }
  ]
})
export class BannerDemoModule {

}
