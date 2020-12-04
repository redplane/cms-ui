import {NgModule} from '@angular/core';
import {BannerDemoRoutingModule} from './banner-demo-routing.module';
import {BannerDemoComponent} from './banner-demo.component';
import {BANNER_BUILDER_PROVIDER, BannerModule, WINDOW_PROVIDERS} from '@cms-ui/core';
import {AlertBannerBuilder} from '../../services/implementations/banners/alert-banner.builder';

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
      useClass: AlertBannerBuilder,
      multi: true
    }
  ]
})
export class BannerDemoModule {

}
