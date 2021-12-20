import {Observable} from 'rxjs';

export interface IEndpointResolver {

  //#region Properties

  // Get end point about a module.
  loadEndpointAsync(moduleName: string,
                    functionName?: string): Observable<string>;

  //#endregion

}
