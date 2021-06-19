import {IValidationSummarizerModuleOptions} from '../models/interfaces/validation-summarizers/validation-summarizer-module-options.interface';
import {IValidationSummarizerOptionProvider, ValidationSummarizerOptionProvider} from '../providers';

// Build child validation summarizer options.
export function buildValidationSummarizerOptionProvider(
  options: IValidationSummarizerModuleOptions[]): IValidationSummarizerOptionProvider {
  return new ValidationSummarizerOptionProvider(options);
}
