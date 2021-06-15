import {InjectFlags, Injector} from '@angular/core';
import {TYPE_VALIDATION_SUMMARIZER_MESSAGE, VALIDATION_SUMMARIZER_MESSAGES} from '../constants';
import {merge as lodashMerge} from 'lodash-es';
import {IValidationSummarizerModuleOptions} from '../models/interfaces/validation-summarizers/validation-summarizer-module-options.interface';

// tslint:disable-next-line:max-line-length
export function buildChildValidationSummarizerMessages(injector: Injector,
                                                       childOptions: IValidationSummarizerModuleOptions)
  : TYPE_VALIDATION_SUMMARIZER_MESSAGE {

  const addedMessages = injector.get(VALIDATION_SUMMARIZER_MESSAGES,
    {}, InjectFlags.SkipSelf);

  const additionalMessages = (childOptions || {}).validationMessages;
  const finalMessages = lodashMerge({}, addedMessages, additionalMessages);
  return finalMessages;
}

export function buildChildValidationSummarizerMessageFallback(childOptions: IValidationSummarizerModuleOptions)
  : boolean {

  if (!childOptions) {
    return false;
  }

  if (childOptions.useBuiltInValidationMessage === null || childOptions.useBuiltInValidationMessage === undefined) {
    return true;
  }

  return childOptions.useBuiltInValidationMessage;
}
