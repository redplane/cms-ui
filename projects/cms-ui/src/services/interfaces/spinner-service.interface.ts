import {Observable} from 'rxjs';
import {ISpinnerOptions} from '../../models/interfaces/spinner-options.interface';
import {DisplaySpinnerRequest} from '../../models';
import {DeleteSpinnerRequest} from '../../models/implementations/delete-spinner-request';

export interface ISpinnerService {

  //#region Methods

  // Display spinner
  displaySpinner(containerId: string, options?: ISpinnerOptions): string;

  // Delete the last spinner request.
  deleteSpinner(containerId: string, id?: string): void;

  // Delete all spinners.
  deleteSpinners(containerId?: string): void;

  // Listen to visibility changed asynchronously.
  hookSpinnerVisibilityEvent(containerId: string): Observable<DisplaySpinnerRequest | DeleteSpinnerRequest>;

  //#endregion
}
