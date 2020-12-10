import {Injector, Type} from '@angular/core';
import { IValidationSummarizerService } from '../../services/interfaces/validation-summarizer-service.interface';


export interface IValidationSummarizerSettings {

  //#region Properties

  // Messages which is used for validation.
  messages?: { [key: string]: any };

  // Implementation of summarizer service.
  implementation?: (injector: Injector) => IValidationSummarizerService;

  // Whether to fallback to built in validation message or not.
  builtInMessageFallback?: boolean;

  //#endregion

}
