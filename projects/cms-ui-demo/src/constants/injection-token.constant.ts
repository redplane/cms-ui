import {InjectionToken} from '@angular/core';
import {DemoLayoutSetting} from '../models/demo-layout-setting';
import {IDemoLayoutService} from '../services/interfaces/demo-layout-service.interface';
import {ValidationItemBuildContext} from '@cms-ui/core';
import {IExampleDescriptionLayoutService} from '../modules/shared/example-description-layout/example-description-layout-service.interface';

// Demo layout service settings.
export const DEMO_LAYOUT_SETTINGS = new InjectionToken<DemoLayoutSetting>('DEMO_LAYOUT_SETTINGS');
export const DEMO_LAYOUT_SERVICE_PROVIDER = new InjectionToken<IDemoLayoutService>('DEMO_LAYOUT_SERVICE_PROVIDER');
export const EXAMPLE_DEMO_LAYOUT_SERVICE_PROVIDER = new InjectionToken<IExampleDescriptionLayoutService>('EXAMPLE_DEMO_LAYOUT_SERVICE_PROVIDER');
export const EXAMPLE_DEMO_DESCRIPTION_MODULE_NAME_PROVIDER = new InjectionToken<string>('EXAMPLE_DEMO_DESCRIPTION_MODULE_NAME_PROVIDER');

// Validation summarizer settings.
export const VALIDATION_ITEM_CONTEXT_PROVIDER = new InjectionToken<ValidationItemBuildContext>('VALIDATION_ITEM_CONTEXT_PROVIDER');

// Windows provider
export const WINDOW = new InjectionToken('WINDOW');

