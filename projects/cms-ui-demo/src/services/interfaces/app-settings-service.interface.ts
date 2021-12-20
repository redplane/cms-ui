import {Observable} from 'rxjs';
import {AppSettings} from '../../models/app-settings';

export interface IAppSettingsService {

  //#region Methods

  /* Load modules configuration from json file.*/
  getAppSettingsAsync(): Observable<AppSettings>;

  //#endregion

}
