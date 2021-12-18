import {Provider} from '@angular/core';
import {MultipleValidationSummarizerService} from '../services/implementations/validators/multiple-validation-summarizers/multiple-validation-summarizer.service';
import { MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS } from '../constants/injectors/multiple-validation-summarizer-injectors';
import {IValidationSummarizerService} from '../services/interfaces/validation-summarizers/validation-summarizer-service.interface';
import {IValidationSummarizerOptionProvider} from '../providers/interfaces/validation-summarizer-options-provider.interface';
import {IValidationSummarizerOptions} from '../models/interfaces/validation-summarizers/validation-summarizer-options.interface';
import {ValidationSummarizerOptionProvider} from '../providers/implementations/validation-summarizer-option.provider';
import {
  MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER,
  MULTIPLE_VALIDATION_SUMMARIZER_SERVICE
} from '../constants/injectors/multiple-validation-summarizer-injectors';

//#region Internal methods

export function buildInternalMultipleValidationSummarizerService(optionProvider: IValidationSummarizerOptionProvider)
  : IValidationSummarizerService {
  return new MultipleValidationSummarizerService(optionProvider);
}

export function buildInternalMultipleValidationSummarizerOptionsProvider(options: IValidationSummarizerOptions[])
  : IValidationSummarizerOptionProvider {
  return new ValidationSummarizerOptionProvider(options);
}

//#endregion

//#region Methods

// Build multiple validation summarizer options.
export function buildMultipleValidationSummarizerOptions(options?: IValidationSummarizerOptions): Provider {
  return {
    provide: MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS,
    useValue: options,
    multi: true
  };
}

// Build multiple validation summarizer option provider service.
export function buildMultipleValidationSummarizerOptionsProvider(): Provider {
  return {
    provide: MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER,
    useFactory: buildInternalMultipleValidationSummarizerOptionsProvider,
    deps: [MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS],
    multi: false
  };
}

// Build multiple validation summarizer service.
export function buildMultipleValidationSummarizerService(): Provider {
  return {
    provide: MULTIPLE_VALIDATION_SUMMARIZER_SERVICE,
    useFactory: buildInternalMultipleValidationSummarizerService,
    deps: [MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER],
    multi: false
  };
}

//#endregion
