import {IDialogSetting} from '../../../models/interfaces/dialogs/dialog-settings.interface';
import {Observable} from 'rxjs';
import {DialogResult} from '../../../models/implementations/dialogs/dialog-result';

export interface IDialogBuilder {

  //#region Properties

  buildAsync<T>(settings: IDialogSetting): Observable<DialogResult<T>>;

  //#endregion

}
