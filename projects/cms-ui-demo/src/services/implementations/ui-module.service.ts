import {IUiModuleService} from '../interfaces/ui-module-service.interface';
import {Inject, Injectable} from '@angular/core';
import {UiModule} from '../../models/ui-module';
import {LoadUiModuleViewModel} from '../../view-models/ui-modules/load-ui-module.view-model';
import {HttpClient} from '@angular/common/http';
import {ENDPOINT_RESOLVER, UI_MODULE_SERVICE} from '../../constants/injectors';
import {IEndpointResolver} from '../interfaces/endpoint-resolver.interface';
import {mergeMap} from 'rxjs/operators';
import {UiModuleViewModel} from '../../view-models/ui-modules/ui-module.view-model';
import {Observable} from 'rxjs';

@Injectable()
export class UiModuleService implements IUiModuleService {

  //#region Constructor

  public constructor(
    @Inject(ENDPOINT_RESOLVER) protected readonly _endpointResolver: IEndpointResolver,
    protected readonly _httpClient: HttpClient) {
  }

  //#endregion

  //#region Methods

  public loadUiModuleByIdAsync(id: string): Observable<UiModuleViewModel> {
    return this._endpointResolver.loadEndpointAsync('', '')
      .pipe(
        mergeMap(baseUrl => {
          const endpoint = `${baseUrl}/api/ui-module/${id}`;
          return this._httpClient.get<UiModuleViewModel>(endpoint);
        })
      );
  }

  public loadUiModulesAsync(model: LoadUiModuleViewModel): Promise<UiModule[]> {
    return Promise.resolve([]);
  }

  //#endregion
}
