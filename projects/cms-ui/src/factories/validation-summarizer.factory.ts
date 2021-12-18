import {IValidationSummarizerModuleOptions} from '../models/interfaces/validation-summarizers/validation-summarizer-module-options.interface';
import {ValidationSummarizerService} from '../services/implementations/validators/validation-summarizers/validation-summarizer.service';
import {Provider} from '@angular/core';
import {VALIDATION_SUMMARIZER_OPTIONS} from '../constants/injectors/internal-injectors';
import {IValidationSummarizerOptionProvider} from '@cms-ui/core/src/providers/interfaces/validation-summarizer-options-provider.interface';
import {IValidationSummarizerService} from '@cms-ui/core/src/services/interfaces/validation-summarizers/validation-summarizer-service.interface';
import {IValidationSummarizerOptions} from '@cms-ui/core/src/models/interfaces/validation-summarizers/validation-summarizer-options.interface';
import {ValidationSummarizerOptionProvider} from '@cms-ui/core/src/providers/implementations/validation-summarizer-option.provider';
import {VALIDATION_SUMMARIZER_OPTIONS_PROVIDER, VALIDATION_SUMMARIZER_SERVICE} from '@cms-ui/core/src/constants/injectors/validation-summarizer-injectors';

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
