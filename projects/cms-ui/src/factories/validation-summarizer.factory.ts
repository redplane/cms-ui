import {InjectFlags, Injector} from '@angular/core';
import {VALIDATION_SUMMARIZER_MODULE_OPTIONS_PROVIDER} from '../constants';
import {merge as lodashMerge} from 'lodash-es';
import {IValidationSummarizerModuleOptions} from '../models/interfaces/validation-summarizers/validation-summarizer-module-options.interface';

// Build child validation summarizer options.
export function buildChildValidationSummarizerOptions(injector: Injector,
                                                      // tslint:disable-next-line:max-line-length
                                                      childOptions: IValidationSummarizerModuleOptions): IValidationSummarizerModuleOptions {

  const addedOptions = injector.get(VALIDATION_SUMMARIZER_MODULE_OPTIONS_PROVIDER,
    {}, InjectFlags.SkipSelf);

  return lodashMerge(addedOptions || {}, childOptions || {});
}
