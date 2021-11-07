import {ValidationSummarizerBaseService} from '../validation-summarizers/validation-summarizer-base.service';
import {IValidationSummarizerService} from '../../../interfaces';
import {MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER} from '../../../../constants';
import {Inject} from '@angular/core';
import {v4 as uuid} from 'uuid';
import {IValidationSummarizerOptionProvider} from '../../../../providers';

export class MultipleValidationSummarizerService
  extends ValidationSummarizerBaseService implements IValidationSummarizerService {

  //#region Properties

  public constructor(@Inject(MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS_PROVIDER)
                     protected readonly optionProvider: IValidationSummarizerOptionProvider) {
    super(optionProvider?.getOption()?.groupId || uuid());
  }

  //#endregion
}
