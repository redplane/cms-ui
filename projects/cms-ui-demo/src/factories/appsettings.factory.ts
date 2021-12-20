import {AppSettings} from '../models/app-settings';
import {IAppSettingsService} from '../services/interfaces/app-settings-service.interface';

export function loadAppSettings(appSettingsService: IAppSettingsService) {
  return () => appSettingsService.getAppSettingsAsync()
    .toPromise();
}
