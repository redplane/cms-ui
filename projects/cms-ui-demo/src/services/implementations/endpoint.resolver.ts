import {IEndpointResolver} from '../interfaces/endpoint-resolver.interface';
import {Inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {APP_SETTINGS_SERVICE} from '../../constants/injectors';
import {IAppSettingsService} from '../interfaces/app-settings-service.interface';
import {map} from 'rxjs/operators';

@Injectable()
export class EndpointResolver implements IEndpointResolver {

  //#region Constructor

  public constructor(@Inject(APP_SETTINGS_SERVICE) protected readonly _appSettingsService: IAppSettingsService) {
  }

  //#endregion

  //#region Methods

  public loadEndpointAsync(moduleName: string, functionName?: string): Observable<string> {
    return this._appSettingsService.getAppSettingsAsync()
      .pipe(
        map(settings => settings.baseUrl)
      );
  }

  //#endregion

}
