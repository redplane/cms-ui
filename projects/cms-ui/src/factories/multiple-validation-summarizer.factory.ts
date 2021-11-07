import {Provider} from '@angular/core';
import {
  MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS,
  MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER,
  MULTIPLE_VALIDATION_SUMMARIZER_SERVICE
} from '../constants';
import {MultipleValidationSummarizerService} from '../services/implementations/validators/multiple-validation-summarizers/multiple-validation-summarizer.service';
import {IValidationSummarizerOptionProvider, ValidationSummarizerOptionProvider} from '../providers';
import {IValidationSummarizerOptions} from '../models';
import {IValidationSummarizerService} from '../services';

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
