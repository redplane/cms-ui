import {Observable} from 'rxjs';
import {AppSettings} from '../../models/app-settings';

export class IAppSettingService {

  //#region Methods

  /* Load app configuration from json file.*/
  getAppSettingsAsync(): Observable<AppSettings>;

  //#endregion

}
