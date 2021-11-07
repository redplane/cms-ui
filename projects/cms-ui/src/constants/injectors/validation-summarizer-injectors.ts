// Validation summarizer providers.
import {InjectionToken} from '@angular/core';
import {IValidationSummarizerItemTemplateBuilder, IValidationSummarizerService} from '../../services';
import {IValidationSummarizerOptionProvider} from '../../providers';

export const VALIDATION_SUMMARIZER_SERVICE = new InjectionToken<IValidationSummarizerService>('VALIDATION_SUMMARIZER_PROVIDER');
export const VALIDATION_ITEM_TEMPLATE_BUILDERS =
  new InjectionToken<IValidationSummarizerItemTemplateBuilder[]>('VALIDATION_ITEM_TEMPLATE_BUILDERS_PROVIDER');
export const VALIDATION_SUMMARIZER_OPTIONS_PROVIDER = new InjectionToken<IValidationSummarizerOptionProvider>('VALIDATION_SUMMARIZER_OPTION_PROVIDER');
