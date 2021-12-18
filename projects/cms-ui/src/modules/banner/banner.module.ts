import {ModuleWithProviders, NgModule} from '@angular/core';
import {BannerComponent} from './banner.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BANNER_SERVICE} from '../../constants/injectors/injectors';
import {BannerService} from '../../services/implementations/banners/banner.service';
import {WINDOW_PROVIDERS} from '../../services/implementations/window.service';
import {IBannerModuleOption} from '../../providers/interfaces/banner-module-option.interface';
import {
  buildBannerProvider,
  buildEmptyContentBuilderProvider,
  buildNullBannerProvider
} from '../../factories/banner.factory';

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
    WINDOW_PROVIDERS,
    {
      provide: BANNER_SERVICE,
      useClass: BannerService
    }
  ]
})
export class BannerModule {

  //#region Methods

  public static forRoot(options?: IBannerModuleOption): ModuleWithProviders<BannerModule> {
    return {
      ngModule: BannerModule,
      providers: [
        // Banner service registration.
        (options || {}).serviceProvider || buildBannerProvider(),

        // Banner content builder.
        (options || {}).contentBuilderProviders || buildEmptyContentBuilderProvider()
      ]
    };
  }

  public static forChild(options?: IBannerModuleOption): ModuleWithProviders<BannerModule> {
    return {
      ngModule: BannerModule,
      providers: [
        // Banner service registration.
        (options || {}).serviceProvider || buildNullBannerProvider(),

        // Banner content builder.
        (options || {}).contentBuilderProviders || buildEmptyContentBuilderProvider()
      ]
    };
  }

  //#endregion
}
