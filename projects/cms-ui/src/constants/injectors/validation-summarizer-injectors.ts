// Validation summarizer providers.
import {InjectionToken} from '@angular/core';
import { IValidationSummarizerService } from '@cms-ui/core/services/interfaces/validation-summarizers';
import {IValidationSummarizerItemTemplateBuilder} from '@cms-ui/core/src/services/interfaces/validation-summarizers/validation-summarizer-item-template-builder.interface';
import {IValidationSummarizerOptionProvider} from '@cms-ui/core/src/providers/interfaces/validation-summarizer-options-provider.interface';

export const VALIDATION_SUMMARIZER_SERVICE = new InjectionToken<IValidationSummarizerService>('VALIDATION_SUMMARIZER_PROVIDER');
export const VALIDATION_ITEM_TEMPLATE_BUILDERS =
  new InjectionToken<IValidationSummarizerItemTemplateBuilder[]>('VALIDATION_ITEM_TEMPLATE_BUILDERS_PROVIDER');
export const VALIDATION_SUMMARIZER_OPTIONS_PROVIDER = new InjectionToken<IValidationSummarizerOptionProvider>('VALIDATION_SUMMARIZER_OPTION_PROVIDER');
