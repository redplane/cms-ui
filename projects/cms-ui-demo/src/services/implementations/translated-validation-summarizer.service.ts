import {Inject, Injectable, Optional} from '@angular/core';
import {
  builtInValidationMessages,
  VALIDATION_SUMMARIZER_BUILT_IN_MESSAGE_FALLBACK,
  VALIDATION_SUMMARIZER_MESSAGES,
  ValidationSummarizerService
} from '@cms-ui/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class TranslatedValidationSummarizerService extends ValidationSummarizerService {

  //#region Constructor

  // tslint:disable-next-line:max-line-length
  public constructor(
    protected readonly translateService: TranslateService,
    @Optional() @Inject(VALIDATION_SUMMARIZER_MESSAGES)
      validatorNameToValidationMessage?: { [name: string]: string; },
    @Optional() @Inject(VALIDATION_SUMMARIZER_BUILT_IN_MESSAGE_FALLBACK)
    protected ableToBuiltInMessageFallback?: boolean) {
    super(builtInValidationMessages, validatorNameToValidationMessage, ableToBuiltInMessageFallback);
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
    let message = this._validatorNameToValidationMessage[validatorName];

    // Message is not found. Build a fall back message.
    if (!message) {
      if (this.ableToBuiltInMessageFallback && this._builtInMessages) {
        message = this._builtInMessages[validatorName];
      }
    }

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
