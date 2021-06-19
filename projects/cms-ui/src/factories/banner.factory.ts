import {BannerService, IBannerService} from '../services';
import {IBannerModuleOption} from '../providers/interfaces/banner-module-option.interface';
import {Provider} from '@angular/core';
import {
  NULL_BANNER_CONTENT_BUILDER_SERVICE_PROVIDER,
  NULL_BANNER_SERVICE_PROVIDER
} from '../constants/internal-injectors';
import {BANNER_SERVICE_PROVIDER} from '../constants';

//#region Services

// Build banner service.
export function buildBannerService(option: IBannerModuleOption)
  : IBannerService {
  return new BannerService();
}

// Build null banner service.
export function buildNullBannerProvider(): Provider {
  return {
    provide: NULL_BANNER_SERVICE_PROVIDER,
    useValue: {}
  };
}

// Build banner provider.
export function buildBannerProvider(): Provider {
  return {
    provide: BANNER_SERVICE_PROVIDER,
    useFactory: buildBannerService
  };
}

//#endregion

//#region Content builders

export function buildEmptyContentBuilderProvider(): Provider {
  return {
    provide: NULL_BANNER_CONTENT_BUILDER_SERVICE_PROVIDER,
    useValue: {}
  };
}

//#endregion

