// Child validation summarizer providers
import {InjectionToken} from '@angular/core';
import {IValidationSummarizerModuleOptions} from '../models/interfaces/validation-summarizers/validation-summarizer-module-options.interface';

// Child module options.
export const VALIDATION_SUMMARIZER_CHILD_MODULE_OPTIONS_PROVIDER =
  new InjectionToken<IValidationSummarizerModuleOptions>('VALIDATION_SUMMARIZER_CHILD_MODULE_OPTIONS_PROVIDER');

// Windows provider
export const WINDOW = new InjectionToken('WINDOW_PROVIDER');
