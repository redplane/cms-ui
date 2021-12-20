import {IAppSettingsService} from '../interfaces/app-settings-service.interface';
import {Injectable} from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import {AppSettings} from '../../models/app-settings';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {merge as lodashMerge} from 'lodash-es';

@Injectable()
export class AppSettingsService implements IAppSettingsService {

  //#region Properties

  private __settings: AppSettings | null;

  //#endregion

  //#region Constructors

  constructor(protected readonly _httpClient: HttpClient) {
    this.__settings = null;
  }

  //#endregion

  //#region Application configuration

  public getAppSettingsAsync(): Observable<AppSettings> {
    // Configuration has been loaded before.
    if (this.__settings) {
      return of(this.__settings);
    }

    // Load the configuration.
    const requestHeaders = new HttpHeaders();

    const files = Environment.files;
    const observables: Observable<AppSettings>[] = [];

    for (const file of files) {
      const loadConfigFileObservable = this._httpClient
        .get<AppSettings>(file, {
          headers: requestHeaders
        })
        .pipe(
          catchError((err) => {
            return of(new AppSettings());
          })
        );

      observables.push(loadConfigFileObservable);
    }

    return forkJoin(observables)
      .pipe(
        map((options: AppSettings[]) => {
          let appSettings = new AppSettings();
          for (const option of options) {
            appSettings = lodashMerge(appSettings, option);
          }
          this.__settings = appSettings;
          return appSettings;
        })
      );
  }

  //#endregion

}
