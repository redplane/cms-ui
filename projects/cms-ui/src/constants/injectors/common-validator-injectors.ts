// Multiple validation summarizer
import {InjectionToken} from '@angular/core';
import {IValidationSummarizerService} from '../../services';
import {IValidationSummarizerOptions} from '../../models';
import {IValidationSummarizerOptionProvider} from '../../providers';

export const COMMON_VALIDATOR_SERVICE = new InjectionToken<IValidationSummarizerService>('COMMON_VALIDATOR_SERVICE');
export const COMMON_VALIDATOR_OPTIONS = new InjectionToken<IValidationSummarizerOptions>('COMMON_VALIDATOR_OPTIONS');
export const COMMON_VALIDATOR_OPTIONS_PROVIDER =
  new InjectionToken<IValidationSummarizerOptionProvider>('COMMON_VALIDATOR_OPTIONS_PROVIDER');
