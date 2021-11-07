import {IValidationSummarizerModuleOptions} from '../models/interfaces/validation-summarizers/validation-summarizer-module-options.interface';
import {IValidationSummarizerOptionProvider, ValidationSummarizerOptionProvider} from '../providers';
import {IValidationSummarizerService} from '../services';
import {ValidationSummarizerService} from '../services/implementations/validation-summarizers/validation-summarizer.service';
import {Provider} from '@angular/core';
import {VALIDATION_SUMMARIZER_OPTION_PROVIDER, VALIDATION_SUMMARIZER_PROVIDER} from '../constants';
import {NULL_VALIDATION_SUMMARIZER_PROVIDER} from '../constants/internal-injectors';

// Build child validation summarizer options.
export function buildValidationSummarizerOptionProvider(
  options: IValidationSummarizerModuleOptions[]): IValidationSummarizerOptionProvider {
  return new ValidationSummarizerOptionProvider(options);
}

// Build up validation summarizer service.
export function buildValidationSummarizerService(optionProvider: IValidationSummarizerOptionProvider)
  : IValidationSummarizerService {
  return new ValidationSummarizerService(optionProvider);
}

// Build validator service.
export function buildValidatorService(): Provider {
  return {
    provide: VALIDATION_SUMMARIZER_PROVIDER,
    useFactory: buildValidationSummarizerService,
    deps: [VALIDATION_SUMMARIZER_OPTION_PROVIDER]
  };
}

// Build null validator service.
export function buildNullValidatorService(): Provider {
  return {
    provide: NULL_VALIDATION_SUMMARIZER_PROVIDER,
    useValue: null
  };
}
