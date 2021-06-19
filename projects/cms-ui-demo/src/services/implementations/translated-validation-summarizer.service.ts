import {Inject, Injectable} from '@angular/core';
import {
  IValidationSummarizerOptionProvider,
  VALIDATION_SUMMARIZER_OPTION_PROVIDER,
  ValidationSummarizerService
} from '@cms-ui/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class TranslatedValidationSummarizerService extends ValidationSummarizerService {

  //#region Constructor

  // tslint:disable-next-line:max-line-length
  public constructor(
    @Inject(VALIDATION_SUMMARIZER_OPTION_PROVIDER) validationSummarizerOptionProvider: IValidationSummarizerOptionProvider,
    protected readonly translateService: TranslateService) {
    super(validationSummarizerOptionProvider);
  }

  //#endregion

  //#region Internal methods

  // Build validation message from specific information.
  protected buildValidationMessage(controlLabel: string, validatorName: string,
                                   additionalValue: { [key: string]: string; }): string {

    if (!this._validatorNameToValidationMessage) {
      return '';
    }

    // Message to be translated.
    const message = this._validatorNameToValidationMessage[validatorName];

    if (!message) {
      return '';
    }

    return this.translateService
      .instant(`VALIDATION_MESSAGES.${message}`, {
        additionalValue,
        controlLabel
      });
  }

  //#endregion
}
