import {Provider} from '@angular/core';
import {
  COMMON_VALIDATOR_OPTIONS,
  COMMON_VALIDATOR_OPTIONS_PROVIDER,
  COMMON_VALIDATOR_SERVICE
} from '../constants/injectors/common-validator-injectors';
import {IValidationSummarizerOptionProvider} from '../providers/interfaces/validation-summarizer-options-provider.interface';
import {IValidationSummarizerService} from '../services/interfaces/validation-summarizers/validation-summarizer-service.interface';
import {ValidationSummarizerService} from '../services/implementations/validators/validation-summarizers/validation-summarizer.service';
import {IValidationSummarizerOptions} from '../models/interfaces/validation-summarizers/validation-summarizer-options.interface';
import {ValidationSummarizerOptionProvider} from '../providers/implementations/validation-summarizer-option.provider';

//#region Internal methods

export function loadValidationSummarizerService(optionProvider: IValidationSummarizerOptionProvider)
  : IValidationSummarizerService {
  return new ValidationSummarizerService(optionProvider);
}

export function buildInternalCommonValidatorOptionsProvider(options: IValidationSummarizerOptions[])
  : IValidationSummarizerOptionProvider {
  return new ValidationSummarizerOptionProvider(options);
}

//#endregion

//#region Methods

// Build multiple validation summarizer options.
export function buildCommonValidatorOptions(options?: IValidationSummarizerOptions): Provider {
  return {
    provide: COMMON_VALIDATOR_OPTIONS,
    useValue: options,
    multi: true
  };
}

// Build multiple validation summarizer option provider service.
export function buildCommonValidatorOptionsProvider(): Provider {
  return {
    provide: COMMON_VALIDATOR_OPTIONS_PROVIDER,
    useFactory: buildInternalCommonValidatorOptionsProvider,
    deps: [COMMON_VALIDATOR_OPTIONS],
    multi: false
  };
}

// Build multiple validation summarizer service.
export function buildCommonValidatorService(): Provider {
  return {
    provide: COMMON_VALIDATOR_SERVICE,
    useFactory: loadValidationSummarizerService,
    deps: [COMMON_VALIDATOR_OPTIONS_PROVIDER],
    multi: false
  };
}

//#endregion
