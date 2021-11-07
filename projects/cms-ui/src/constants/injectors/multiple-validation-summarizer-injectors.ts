// Multiple validation summarizer
import {InjectionToken} from '@angular/core';
import {IValidationSummarizerService} from '../../services';
import {IValidationSummarizerOptions} from '../../models';
import {IValidationSummarizerOptionProvider} from '../../providers';

export const MULTIPLE_VALIDATION_SUMMARIZER_SERVICE = new InjectionToken<IValidationSummarizerService>('MULTIPLE_VALIDATION_SUMMARIZER_SERVICE');
export const MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS = new InjectionToken<IValidationSummarizerOptions>('MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER');
export const MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER = new InjectionToken<IValidationSummarizerOptionProvider>('MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER');
