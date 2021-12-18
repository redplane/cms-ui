// Multiple validation summarizer
import {InjectionToken} from '@angular/core';
import {IValidationSummarizerService} from '../../services/interfaces/validation-summarizers/validation-summarizer-service.interface';
import {IValidationSummarizerOptions} from '../../models/interfaces/validation-summarizers/validation-summarizer-options.interface';
import {IValidationSummarizerOptionProvider} from '../../providers/interfaces/validation-summarizer-options-provider.interface';

export const MULTIPLE_VALIDATION_SUMMARIZER_SERVICE = new InjectionToken<IValidationSummarizerService>('MULTIPLE_VALIDATION_SUMMARIZER_SERVICE');
export const MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS = new InjectionToken<IValidationSummarizerOptions>('MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER');
export const MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER = new InjectionToken<IValidationSummarizerOptionProvider>('MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER');
