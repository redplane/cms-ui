import {Observable} from 'rxjs';

export interface IExampleDescriptionLayoutService {

  //#region Properties

  loadHtmlContentAsync(moduleName: string): Observable<string>;

  //#endregion
}
