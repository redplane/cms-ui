import {Provider} from '@angular/core';
import {COMMON_VALIDATOR_OPTIONS, COMMON_VALIDATOR_OPTIONS_PROVIDER, COMMON_VALIDATOR_SERVICE} from '../constants';
import {IValidationSummarizerOptionProvider, ValidationSummarizerOptionProvider} from '../providers';
import {IValidationSummarizerOptions} from '../models';
import {IValidationSummarizerService, ValidationSummarizerService} from '../services';

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
