import {ValidationSummarizerBaseService} from '../services/implementations/validators/validation-summarizers/validation-summarizer-base.service';
import {v4 as uuid} from 'uuid';

export function buildHasAnyValidatorService(): ValidationSummarizerBaseService {
  return new ValidationSummarizerBaseService(uuid());
}
