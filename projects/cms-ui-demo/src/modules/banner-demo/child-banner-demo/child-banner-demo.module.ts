import {NgModule} from '@angular/core';
import {ChildBannerDemoComponent} from './child-banner-demo.component';
import {ChildBannerDemoRoutingModule} from './child-banner-demo-routing.module';
import {BANNER_BUILDER_PROVIDER, BannerModule} from '@cms-ui/core';
import {AlertBannerContentBuilder} from '../../../services/implementations/banners/alert-banner-content.builder';
import {InfoBannerContentBuilder} from '../../../services/implementations/banners/info-banner-content.builder';
import {TranslateModule} from '@ngx-translate/core';
import {WarningBannerContentBuilder} from '../../../services/implementations/banners/warning-banner-content.builder';
import {WarningBannerContentModule} from '../../shared/warning-banner-content/warning-banner-content.module';
import {WarningBannerContentComponent} from '../../shared/warning-banner-content/warning-banner-content.component';

@NgModule({
  imports: [
    WarningBannerContentModule,
    BannerModule.forChild({
      contentBuilderProviders: [
        {
          provide: BANNER_BUILDER_PROVIDER,
          useClass: WarningBannerContentBuilder,
          multi: true
        }
      ]
    }),
    ChildBannerDemoRoutingModule,
    TranslateModule
  ],
  declarations: [
    ChildBannerDemoComponent
  ],
  entryComponents: [
    WarningBannerContentComponent
  ]
})
export class ChildBannerDemoModule {

}
