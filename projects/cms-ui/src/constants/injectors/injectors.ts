import {InjectionToken} from '@angular/core';
import {ISpinnerService} from '../../services/interfaces/spinner-service.interface';
import {IBannerService} from '../../services/interfaces/banners/banner-service.interface';
import {ISmartNavigatorService} from '../../services/interfaces/smart-navigator-service.interface';
import {IBannerContentBuilder} from '../../services/interfaces/banners/banner-content-builder.interface';
import {IDialogBuilder} from '../../services/interfaces/dialogs/dialog-builder.interface';
import {IScreenCodeResolver} from '../../services/interfaces/screen-code-resolver.interface';
import {IMeetRequirementService} from '../../modules/sentinel/requirement-sentinel/requirement-sentinel-service.interface';
import {IRoleSentinelService} from '../../modules/sentinel/role-sentinel/role-sentinel-service.interface';
import {IRequirementHandler} from '../../modules/sentinel/requirement-sentinel/requirement-handler.interface';
import {IFeatureSentinelService} from '../../modules/sentinel/feature-sentinel/feature-sentinel-service.interface';
import {IDialogService} from '../../services/interfaces/dialogs/dialog-service.interface';

// Spinner providers.
export const SPINNER_SERVICE_PROVIDER = new InjectionToken<ISpinnerService>('SPINNER_SERVICE_PROVIDER');

// Banner providers.
export const BANNER_SERVICE_PROVIDER = new InjectionToken<IBannerService>('BANNER_SERVICE_PROVIDER');
export const BANNER_BUILDER_PROVIDER = new InjectionToken<IBannerContentBuilder>('BANNER_BUILDER_PROVIDER');

// Smart navigator providers.
export const SMART_NAVIGATOR_PROVIDER = new InjectionToken<ISmartNavigatorService>('SMART_NAVIGATOR_PROVIDER');
export const SMART_NAVIGATOR_ROUTES = new InjectionToken<{ [key: string]: string }>('SMART_NAVIGATOR_ROUTES');
export const SMART_NAVIGATOR_SCREEN_CODE_RESOLVER = new InjectionToken<IScreenCodeResolver>('SMART_NAVIGATOR_SCREEN_CODE_RESOLVER');

// Dialog providers.
export const DIALOG_BUILDER_PROVIDER = new InjectionToken<IDialogBuilder>('DIALOG_BUILDER_PROVIDER');
export const DIALOG_SERVICE_PROVIDER = new InjectionToken<IDialogService>('DIALOG_SERVICE_PROVIDER');

// Sentinel providers
export const REQUIREMENT_SENTINEL_SERVICE = new InjectionToken<IMeetRequirementService>('REQUIREMENT_SENTINEL_SERVICE');
export const REQUIREMENT_HANDLER_PROVIDER = new InjectionToken<IRequirementHandler>('REQUIREMENT_HANDLER_PROVIDER');

export const FEATURE_SENTINEL_SERVICE_PROVIDER = new InjectionToken<IFeatureSentinelService>('FEATURE_SENTINEL_SERVICE_PROVIDER');
export const ROLE_SENTINEL_SERVICE_PROVIDER =
  new InjectionToken<IRoleSentinelService>('ROLE_SENTINEL_SERVICE_PROVIDER');
