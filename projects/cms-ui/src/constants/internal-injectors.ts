// Child validation summarizer providers
import {InjectionToken} from '@angular/core';
import {IValidationSummarizerModuleOptions} from '../models/interfaces/validation-summarizers/validation-summarizer-module-options.interface';
import {IValidationSummarizerService} from '../services';

// Validation summarizer option.
// tslint:disable-next-line:max-line-length
export const VALIDATION_SUMMARIZER_OPTION = new InjectionToken<IValidationSummarizerModuleOptions>('VALIDATION_SUMMARIZER_OPTIONS_PROVIDER');
export const NULL_VALIDATION_SUMMARIZER_PROVIDER = new InjectionToken<IValidationSummarizerService>('BLANK_VALIDATION_SUMMARIZER_PROVIDER');

// Windows provider.
export const WINDOW = new InjectionToken('WINDOW_PROVIDER');
