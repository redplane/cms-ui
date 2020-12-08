import {Inject, Injectable, Optional} from '@angular/core';
import {AbstractControl, FormControl, FormControlDirective, FormGroup, NgControl, ValidationErrors} from '@angular/forms';
import {merge as lodashMerge} from 'lodash';
import {VALIDATION_SUMMARIZER_BUILT_IN_MESSAGE_FALLBACK, VALIDATION_SUMMARIZER_BUILT_IN_MESSAGES, ValidationMessage} from '@cms-ui/core';
import {TranslateService} from '@ngx-translate/core';
import {ValidationSummarizerService} from '@cms-ui/core';
import {VALIDATION_SUMMARIZER_MESSAGES} from '@cms-ui/core';

@Injectable()
export class TranslatedValidationSummarizerService extends ValidationSummarizerService {

  //#region Constructor

  // tslint:disable-next-line:max-line-length
  public constructor(@Inject(VALIDATION_SUMMARIZER_BUILT_IN_MESSAGES) protected builtInMessages: { [key: string]: string },
                     protected translateService: TranslateService,
                     @Optional() @Inject(VALIDATION_SUMMARIZER_MESSAGES)
                       validatorNameToValidationMessage?: { [name: string]: string; },
                     @Optional() @Inject(VALIDATION_SUMMARIZER_BUILT_IN_MESSAGE_FALLBACK)
                     protected ableToBuiltInMessageFallback?: boolean) {
    super(builtInMessages, validatorNameToValidationMessage, ableToBuiltInMessageFallback);
  }

  //#endregion

  //#region Internal methods

  // Build validation message from specific information.
  protected buildValidationMessage(controlLabel: string, validatorName: string,
                                   additionalValue: { [key: string]: string; }): string {

    if (!this._validatorNameToValidationMessage) {
      return '';
    }

    if (!this._validatorNameToValidationMessage[validatorName]) {
      return '';
    }

    const initialMessage = this._validatorNameToValidationMessage[validatorName];
    const translatedControlLabel = this.translateService.instant(controlLabel);
    const translatedMessage = this.translateService.instant(initialMessage, {
      additionalValue,
      controlLabel: translatedControlLabel
    });

    return translatedMessage;
  }

  //#endregion
}
