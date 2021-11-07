import {IValidationSummarizerOptionProvider} from '../interfaces/validation-summarizer-option-provider.interface';
import {IValidationSummarizerModuleOptions} from '../../models';
import {Inject} from '@angular/core';
import {VALIDATION_SUMMARIZER_OPTIONS} from '../../constants/internal-injectors';
import {merge as lodashMerge} from 'lodash-es';

export class ValidationSummarizerOptionProvider
  implements IValidationSummarizerOptionProvider {

  //#region Constructor

  public constructor(@Inject(VALIDATION_SUMMARIZER_OPTIONS)
                     protected options: IValidationSummarizerModuleOptions[]) {
  }

  //#endregion

  //#region Methods

  public getOption(): IValidationSummarizerModuleOptions {
    let finalOption = {};
    for (const option of this.options) {
      finalOption = lodashMerge(finalOption, option);
    }

    return finalOption;
  }

  //#endregion
}
