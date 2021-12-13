import {IValidationSummarizerModuleOptions} from '../models/interfaces/validation-summarizers/validation-summarizer-module-options.interface';
import {IValidationSummarizerOptionProvider, ValidationSummarizerOptionProvider} from '../providers';
import {IValidationSummarizerService} from '../services';
import {ValidationSummarizerService} from '../services/implementations/validators/validation-summarizers/validation-summarizer.service';
import {Provider} from '@angular/core';
import {VALIDATION_SUMMARIZER_OPTIONS_PROVIDER, VALIDATION_SUMMARIZER_SERVICE} from '../constants';
import {VALIDATION_SUMMARIZER_OPTIONS} from '../constants/injectors/internal-injectors';
import {IValidationSummarizerOptions} from '../models';

//#region Internal function

// Build up validation summarizer service.
export function buildInternalValidationSummarizerService(optionProvider: IValidationSummarizerOptionProvider)
  : IValidationSummarizerService {
  return new ValidationSummarizerService(optionProvider);
}

// Build up validation summarizer options.
export function buildInternalValidationSummarizerOptionsProvider(options: IValidationSummarizerOptions[])
  : IValidationSummarizerOptionProvider {
  return new ValidationSummarizerOptionProvider(options);
}


//#endregion

//#region External function

// Build validation summarizer options.
export function buildValidationSummarizerOptions(options: IValidationSummarizerModuleOptions): Provider {
  return {
    provide: VALIDATION_SUMMARIZER_OPTIONS,
    useValue: options,
    multi: true
  };
}

// Build validation summarizer options provider.
export function buildValidationSummarizerOptionsProvider(): Provider {
  return {
    provide: VALIDATION_SUMMARIZER_OPTIONS_PROVIDER,
    useFactory: buildInternalValidationSummarizerOptionsProvider,
    deps: [VALIDATION_SUMMARIZER_OPTIONS],
    multi: false
  };
}

// Build validator service.
export function buildValidationSummarizerService(): Provider {
  return {
    provide: VALIDATION_SUMMARIZER_SERVICE,
    useFactory: buildInternalValidationSummarizerService,
    deps: [VALIDATION_SUMMARIZER_OPTIONS_PROVIDER],
    multi: false
  };
}

//#endregion
