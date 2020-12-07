import {Observable} from 'rxjs';
import {IConfirmModalSettings} from '../../models/interfaces/dialogs/basic-dialog-setting.interface';
import {ISelectModalSettings} from './select-modal/select-modal-settings.interface';

export interface IModalService {

  //#region Methods

  // Display confirm modal asynchronously
  displayConfirmModalAsync<T>(settings: IConfirmModalSettings): Observable<T>;

  // Display select modal asynchronously
  displaySelectModalAsync<T>(settings: ISelectModalSettings): Observable<T>;

  // Close all dialog
  closeAll(): void;

  //#endregion
}
