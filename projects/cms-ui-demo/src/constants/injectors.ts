import {InjectionToken, Type} from '@angular/core';
import {DemoLayoutSetting} from '../models/demo-layout-setting';
import {ValidationItemBuildContext} from '@cms-ui/core';
import {IExampleDescriptionLayoutService} from '../modules/shared/example-description-layout/example-description-layout-service.interface';
import {DemoLayoutService} from '../modules/shared/demo-layout/demo-layout.service';
import {DemoLayoutItem} from '../modules/shared/demo-layout/demo-layout-items/demo-layout-item';
import {IModuleDescriptionService} from '../modules/shared/demo-layout/module-description/module-description-service.interface';
import {IDemoModuleService} from '../services/interfaces/demo-module-service.interface';
import {ICategoryService} from '../services/interfaces/category-service.interface';

// Demo layout service settings.
export const DEMO_LAYOUT_SETTINGS = new InjectionToken<DemoLayoutSetting>('DEMO_LAYOUT_SETTINGS');
export const DEMO_LAYOUT_SERVICE_PROVIDER = new InjectionToken<DemoLayoutService>('DEMO_LAYOUT_SERVICE_PROVIDER');
export const EXAMPLE_DEMO_LAYOUT_SERVICE_PROVIDER = new InjectionToken<IExampleDescriptionLayoutService>('EXAMPLE_DEMO_LAYOUT_SERVICE_PROVIDER');
export const EXAMPLE_DEMO_DESCRIPTION_MODULE_NAME_PROVIDER = new InjectionToken<string>('EXAMPLE_DEMO_DESCRIPTION_MODULE_NAME_PROVIDER');

// Validation summarizer settings.
export const VALIDATION_ITEM_CONTEXT_PROVIDER = new InjectionToken<ValidationItemBuildContext>('VALIDATION_ITEM_CONTEXT_PROVIDER');

// Windows provider
export const WINDOW = new InjectionToken('WINDOW');

export const DEMO_LAYOUT_ITEMS_TEMPLATE_TYPE_PROVIDER = new InjectionToken<Type<any>>('DEMO_LAYOUT_ITEMS_TEMPLATE_TYPE_PROVIDER');
export const DEMO_LAYOUT_ITEMS_BUILDER_PROVIDER = new InjectionToken<DemoLayoutItem[]>('DEMO_LAYOUT_ITEMS_PROVIDER');


// Demo services
export const MODULE_DESCRIPTION_TEMPLATE_PATH_PROVIDER = new InjectionToken<string>('MODULE_DESCRIPTION_NAME_PROVIDER');
export const MODULE_DESCRIPTION_SERVICE_PROVIDER = new InjectionToken<IModuleDescriptionService>('MODULE_DESCRIPTION_SERVICE_PROVIDER');
export const DEMO_PAGE_TEMPLATE_PATH_PROVIDER = new InjectionToken<string>('DEMO_PAGE_TEMPLATE_PATH_PROVIDER');
export const DEMO_PAGE_SERVICE_PROVIDER = new InjectionToken<string>('DEMO_PAGE_SERVICE_PROVIDER');

export const DEMO_MODULE_SERVICE = new InjectionToken<IDemoModuleService>('DEMO_MODULE_SERVICE');
export const CATEGORY_SERVICE = new InjectionToken<ICategoryService>('CATEGORY_SERVICE');
