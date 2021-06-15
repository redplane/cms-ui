// Child validation summarizer providers
import {InjectionToken} from '@angular/core';
import {IValidationSummarizerModuleOptions} from '../models/interfaces/validation-summarizers/validation-summarizer-module-options.interface';
import {IValidationSummarizerOptions} from '../models/interfaces/validation-summarizers/validation-summarizer-options.interface';

export const VALIDATION_SUMMARIZER_CHILD_OPTIONS_PROVIDER =
  new InjectionToken<IValidationSummarizerModuleOptions>('VALIDATION_SUMMARIZER_CHILD_OPTIONS_PROVIDER');

// Provider for injecting validation summarizer options.
export const VALIDATION_SUMMARIZER_OPTIONS_PROVIDER = new InjectionToken<IValidationSummarizerOptions>('VALIDATION_SUMMARIZER_OPTIONS_PROVIDER');
