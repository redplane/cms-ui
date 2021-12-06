import {IDemoModuleService} from '../interfaces/demo-module-service.interface';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UiModule} from '../../models/ui-module';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DemoModuleService implements IDemoModuleService {

  //#region Properties

  private readonly _baseUrl = 'http://localhost:3000';

  //#endregion

  //#region Constructor

  public constructor(protected readonly httpClient: HttpClient) {
  }

  //#endregion

  //#region Methods

  public loadDemoModulesAsync(): Observable<UiModule[]> {
    const endPoint = `${this._baseUrl}/api/demo-module/search`;
    return this.httpClient.post<UiModule[]>(endPoint, {});
  }


  //#endregion
}
