import {Type} from '@angular/core';
import {IValidationSummarizerService} from '@cms-ui/core';

export interface IValidationSummarizerSettings {

  //#region Properties

  // Messages which is used for validation.
  messages?: { [key: string]: any };

  // Implementation of summarizer service.
  implementation?: Type<IValidationSummarizerService>;

  // Whether to fallback to built in validation message or not.
  builtInMessageFallback?: boolean;

  //#endregion

}
