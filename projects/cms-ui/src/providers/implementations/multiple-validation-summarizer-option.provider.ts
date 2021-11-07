import {IMultipleValidationSummarizerOptionProvider} from '../interfaces';
import {Inject, Injectable} from '@angular/core';
import {MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS} from '../../constants';
import {merge as lodashMerge} from 'lodash-es';
import {IMultipleValidationSummarizerOptions} from '../../models/interfaces/multiple-validation-summarizers/multiple-validation-summarizer-options.interface';

@Injectable()
export class MultipleValidationSummarizerOptionProvider implements IMultipleValidationSummarizerOptionProvider {

  //#region Constructor

  public constructor(@Inject(MULTIPLE_VALIDATION_SUMMARIZER_OPTIONS)
                     protected options: IMultipleValidationSummarizerOptionProvider[]) {
  }

  //#endregion

  //#region Methods

  public getOption(): IMultipleValidationSummarizerOptions {
    let finalOption = {};
    for (const option of this.options) {
      finalOption = lodashMerge(finalOption, option);
    }

    return finalOption;
  }
}
