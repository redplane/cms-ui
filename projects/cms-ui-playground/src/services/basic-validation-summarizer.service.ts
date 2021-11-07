import {Inject, Injectable} from '@angular/core';
import {
  IValidationSummarizerOptionProvider,
  VALIDATION_SUMMARIZER_OPTION_PROVIDER,
  ValidationSummarizerService
} from '@cms-ui/core';

@Injectable()
export class BasicValidationSummarizerService extends ValidationSummarizerService {

  //#region Constructor

  // tslint:disable-next-line:max-line-length
  public constructor(
    @Inject(VALIDATION_SUMMARIZER_OPTION_PROVIDER) validationSummarizerOptionProvider: IValidationSummarizerOptionProvider) {
    super(validationSummarizerOptionProvider);
  }

  //#endregion

  //#region Internal methods

  //#endregion
}
