import {Observable} from 'rxjs';
import {IDialogSettings} from '../../../models/interfaces/dialogs/dialog-settings.interface';

export interface IDialogService {

  //#region Methods

  // Display confirm modal asynchronously
  displayDialogAsync<T>(settings: IDialogSettings): Observable<T>;

  // Close all dialog
  closeAll(): void;

  //#endregion
}
