import {NgModule} from '@angular/core';
import {BannerDemoRoutingModule} from './banner-demo-routing.module';
import {BannerDemoComponent} from './banner-demo.component';
import {BANNER_BUILDER, BannerModule} from '@cms-ui/core';
import {AlertBannerContentBuilder} from '../../services/implementations/banners/alert-banner-content.builder';
import {InfoBannerContentBuilder} from '../../services/implementations/banners/info-banner-content.builder';
import {AlertBannerContentComponent} from '../shared/alert-banner-content/alert-banner-content.component';
import {InfoBannerContentComponent} from '../shared/info-banner-content/info-banner-content.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    BannerModule.forRoot({
      contentBuilderProviders: [
        {
          provide: BANNER_BUILDER,
          useClass: AlertBannerContentBuilder,
          multi: true
        },
        {
          provide: BANNER_BUILDER,
          useClass: InfoBannerContentBuilder,
          multi: true
        }
      ]
    }),
    BannerDemoRoutingModule,
    RouterModule
  ],
  declarations: [
    BannerDemoComponent
  ],
  exports: [
    BannerDemoRoutingModule
  ],
  entryComponents: [
    AlertBannerContentComponent,
    InfoBannerContentComponent
  ]
})
export class BannerDemoModule {

}
