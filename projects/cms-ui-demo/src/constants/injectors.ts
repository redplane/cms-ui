import {InjectionToken, Type} from '@angular/core';
import {DemoLayoutSetting} from '../models/demo-layout-setting';
import {
  IExampleDescriptionLayoutService
} from '../modules/shared/example-description-layout/example-description-layout-service.interface';
import {UiModulePageService} from '../modules/pages/ui-module-page/ui-module-page.service';
import {
  IModuleDescriptionService
} from '../modules/shared/demo-layout/module-description/module-description-service.interface';
import {ISectionService} from '../services/interfaces/section-service.interface';
import {ICategoryService} from '../services/interfaces/category-service.interface';
import {IUiModuleService} from '../services/interfaces/ui-module-service.interface';
import {EndpointResolver} from '../services/implementations/endpoint.resolver';
import {IAppSettingsService} from '../services/interfaces/app-settings-service.interface';

// Demo layout service settings.
export const DEMO_LAYOUT_SETTINGS = new InjectionToken<DemoLayoutSetting>('DEMO_LAYOUT_SETTINGS');
export const UI_MODULE_PAGE_SERVICE = new InjectionToken<UiModulePageService>('DEMO_LAYOUT_SERVICE_PROVIDER');
export const EXAMPLE_DEMO_LAYOUT_SERVICE_PROVIDER = new InjectionToken<IExampleDescriptionLayoutService>('EXAMPLE_DEMO_LAYOUT_SERVICE_PROVIDER');
export const EXAMPLE_DEMO_DESCRIPTION_MODULE_NAME_PROVIDER = new InjectionToken<string>('EXAMPLE_DEMO_DESCRIPTION_MODULE_NAME_PROVIDER');

// Windows provider
export const WINDOW = new InjectionToken('WINDOW');

export const DEMO_LAYOUT_ITEMS_TEMPLATE_TYPE_PROVIDER = new InjectionToken<Type<any>>('DEMO_LAYOUT_ITEMS_TEMPLATE_TYPE_PROVIDER');

// Application service.
export const APP_SETTINGS_SERVICE = new InjectionToken<IAppSettingsService>('APP_SETTINGS_SERVICE');
export const ENDPOINT_RESOLVER = new InjectionToken<EndpointResolver>('ENDPOINT_RESOLVER');

// Demo services
export const MODULE_DESCRIPTION_TEMPLATE_PATH_PROVIDER = new InjectionToken<string>('MODULE_DESCRIPTION_NAME_PROVIDER');
export const MODULE_DESCRIPTION_SERVICE_PROVIDER = new InjectionToken<IModuleDescriptionService>('MODULE_DESCRIPTION_SERVICE_PROVIDER');
export const DEMO_PAGE_TEMPLATE_PATH_PROVIDER = new InjectionToken<string>('DEMO_PAGE_TEMPLATE_PATH_PROVIDER');

export const CATEGORY_SERVICE = new InjectionToken<ICategoryService>('CATEGORY_SERVICE');
export const UI_MODULE_SERVICE = new InjectionToken<IUiModuleService>('UI_MODULE_SERVICE');
export const SECTION_SERVICE = new InjectionToken<ISectionService>('SECTION_SERVICE');
