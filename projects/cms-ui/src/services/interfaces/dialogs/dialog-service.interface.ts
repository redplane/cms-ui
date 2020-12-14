import {Observable} from 'rxjs';
import {IDialogSetting} from '../../../models/interfaces/dialogs/dialog-settings.interface';

export interface IDialogService {

  //#region Methods

  // Display confirm modal asynchronously
  displayDialogAsync<T>(settings: IDialogSetting): Observable<T>;

  // Close all dialog
  closeAll(): void;

  //#endregion
}
