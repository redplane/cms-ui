// Build validator service.
import {Provider} from '@angular/core';
import {MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER, MULTIPLE_VALIDATION_SUMMARIZER_SERVICE_PROVIDER} from '../constants';
import {MultipleValidationSummarizerService} from '../services/implementations/multiple-validation-summarizers/multiple-validation-summarizer.service';


// Build multiple validation summarizer service.
export function buildMultipleValidationSummarizerService(): Provider {
  return {
    provide: MULTIPLE_VALIDATION_SUMMARIZER_SERVICE_PROVIDER,
    useClass: MultipleValidationSummarizerService,
    deps: [MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER]
  };
}
