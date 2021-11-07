// Child validation summarizer providers
import {InjectionToken} from '@angular/core';
import {IValidationSummarizerModuleOptions} from '../../models/interfaces/validation-summarizers/validation-summarizer-module-options.interface';
import {IBannerContentBuilder, IBannerService, IValidationSummarizerService} from '../../services';
import {ValidationSummarizerBaseService} from '../../services/implementations/validators/validation-summarizers/validation-summarizer-base.service';

// Validation summarizer option.
// tslint:disable-next-line:max-line-length
export const VALIDATION_SUMMARIZER_OPTIONS = new InjectionToken<IValidationSummarizerModuleOptions>('VALIDATION_SUMMARIZER_OPTIONS_PROVIDER');
export const NULL_VALIDATION_SUMMARIZER_PROVIDER = new InjectionToken<IValidationSummarizerService>('BLANK_VALIDATION_SUMMARIZER_PROVIDER');

// Common validator
export const NULL_COMMON_VALIDATOR_SERVICE = new InjectionToken<IValidationSummarizerService>('NULL_COMMON_VALIDATOR_SERVICE');

// Banner
export const NULL_BANNER_SERVICE_PROVIDER = new InjectionToken<IBannerService>('NULL_BANNER_SERVICE_PROVIDER');
export const NULL_BANNER_CONTENT_BUILDER_SERVICE_PROVIDER = new InjectionToken<IBannerContentBuilder>('NULL_BANNER_CONTENT_BUILDER_SERVICE_PROVIDER');

// Validation pipe
export const HAS_ANY_VALIDATOR_SERVICE = new InjectionToken<ValidationSummarizerBaseService>('HAS_ANY_VALIDATOR_SERVICE');

// Windows provider.
export const WINDOW = new InjectionToken('WINDOW_PROVIDER');
