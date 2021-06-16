import {Inject, Injectable} from '@angular/core';
import {VALIDATION_SUMMARIZER_MODULE_OPTIONS_PROVIDER, ValidationSummarizerService} from '@cms-ui/core';
import {TranslateService} from '@ngx-translate/core';
import {IValidationSummarizerModuleOptions} from '../../../../cms-ui/src/models/interfaces/validation-summarizers/validation-summarizer-module-options.interface';

@Injectable()
export class TranslatedValidationSummarizerService extends ValidationSummarizerService {

  //#region Constructor

  // tslint:disable-next-line:max-line-length
  public constructor(
    @Inject(VALIDATION_SUMMARIZER_MODULE_OPTIONS_PROVIDER) validationSummarizerOptions: IValidationSummarizerModuleOptions,
    protected readonly translateService: TranslateService) {
    super(validationSummarizerOptions);
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
