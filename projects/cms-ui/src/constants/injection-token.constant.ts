import {InjectionToken} from '@angular/core';
import {ISpinnerService} from '../services/interfaces/spinner-service.interface';
import {IBannerService} from '../services/interfaces/banners/banner-service.interface';
import {ISmartNavigatorService} from '../services/interfaces/smart-navigator-service.interface';
import {IValidationSummarizerService} from '../services/interfaces/validation-summarizer-service.interface';

// Spinner providers.
export const SPINNER_SERVICE_PROVIDER = new InjectionToken<ISpinnerService>('SPINNER_SERVICE_PROVIDER');

// Banner providers.
export const BANNER_SERVICE_PROVIDER = new InjectionToken<IBannerService>('Service provider for handling banner business');
export const BANNER_CONTAINER_PROVIDER = new InjectionToken<string>('Banner container id');

// Smart navigator providers.
export const SMART_NAVIGATOR_PROVIDER = new InjectionToken<ISmartNavigatorService>('SMART_NAVIGATOR_PROVIDER');
export const SMART_NAVIGATOR_ROUTES = new InjectionToken<{[key: string]: string}>('SMART_NAVIGATOR_ROUTES');

// Validation summarizer providers.
export const VALIDATION_SUMMARIZER_PROVIDER = new InjectionToken<IValidationSummarizerService>('VALIDATION_SUMMARIZER_PROVIDER');
export const VALIDATION_SUMMARIZER_MESSAGES = new InjectionToken<{[key: string]: string}>('VALIDATION_SUMMARIZER_MESSAGES');
