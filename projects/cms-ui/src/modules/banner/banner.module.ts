import {ModuleWithProviders, NgModule, Type} from '@angular/core';
import {BannerComponent} from './banner.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {IBannerService} from '../../services/interfaces/banners/banner-service.interface';
import {BANNER_SERVICE_PROVIDER} from '../../constants/injection-token.constant';
import {BannerService} from '../../services/implementations/banner.service';

@NgModule({
  declarations: [
    BannerComponent
  ],
  exports: [
    BannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    {
      provide: BANNER_SERVICE_PROVIDER,
      useClass: BannerService
    }
  ]
})
export class BannerModule {

  //#region Methods

  public static forRoot(bannerService?: Type<IBannerService>): ModuleWithProviders<BannerModule> {
    return {
      ngModule: BannerModule,
      providers: [
        {
          provide: BANNER_SERVICE_PROVIDER,
          useClass: bannerService || BannerService
        }
      ]
    };
  }

  //#endregion
}
