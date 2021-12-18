// Multiple validation summarizer
import {InjectionToken} from '@angular/core';
import {IValidationSummarizerService} from '../../services/interfaces/validation-summarizers/validation-summarizer-service.interface';
import {IValidationSummarizerOptions} from '../../models/interfaces/validation-summarizers/validation-summarizer-options.interface';
import {IValidationSummarizerOptionProvider} from '../../providers/interfaces/validation-summarizer-options-provider.interface';

export const COMMON_VALIDATOR_SERVICE = new InjectionToken<IValidationSummarizerService>('COMMON_VALIDATOR_SERVICE');
export const COMMON_VALIDATOR_OPTIONS = new InjectionToken<IValidationSummarizerOptions>('COMMON_VALIDATOR_OPTIONS');
export const COMMON_VALIDATOR_OPTIONS_PROVIDER =
  new InjectionToken<IValidationSummarizerOptionProvider>('COMMON_VALIDATOR_OPTIONS_PROVIDER');
