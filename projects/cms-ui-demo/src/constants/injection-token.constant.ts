import {InjectionToken} from '@angular/core';
import {DemoLayoutSetting} from '../models/demo-layout-setting';
import {IDemoLayoutService} from '../services/interfaces/demo-layout-service.interface';

// Demo layout service settings.
export const DEMO_LAYOUT_SETTINGS = new InjectionToken<DemoLayoutSetting>('DEMO_LAYOUT_SETTINGS');
export const DEMO_LAYOUT_SERVICE_PROVIDER = new InjectionToken<IDemoLayoutService>('DEMO_LAYOUT_SERVICE_PROVIDER');
