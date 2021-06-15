// Child validation summarizer providers
import {InjectionToken} from '@angular/core';
import {IValidationSummarizerModuleOptions} from '../models/interfaces/validation-summarizers/validation-summarizer-module-options.interface';

export const VALIDATION_SUMMARIZER_CHILD_OPTIONS_PROVIDER =
  new InjectionToken<IValidationSummarizerModuleOptions>('VALIDATION_SUMMARIZER_CHILD_OPTIONS_PROVIDER');
