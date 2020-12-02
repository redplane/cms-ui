import {Observable} from 'rxjs';
import {SpinnerVisibilityChanged} from '../../models/implementations/spinner-visibility-changed';

export interface ISpinnerService {

  //#region Methods

  // Display spinner
  displaySpinner(containerId: string, isTransparent?: boolean): string;

  // Delete the last spinner request.
  deleteSpinner(containerId: string, id?: string): void;

  // Delete all spinners.
  deleteSpinners(containerId?: string): void;

  // Listen to visibility changed asynchronously.
  hookVisibilityChangedAsync(containerId: string): Observable<SpinnerVisibilityChanged>;

  //#endregion
}
