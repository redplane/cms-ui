import {AbstractControl, NgControl} from '@angular/forms';

export interface IMultipleValidationSummarizerOptions {

  //#region Properties

  // Id of group the validation summarizer belongs to.
  groupId?: string;

  // Handler for toggling validation summarizer visibility.
  visibilityHandler?: ((ngControl: AbstractControl | NgControl) => boolean) | null;

  //#endregion

}
