import {Observable} from 'rxjs';

export interface IModuleDescriptionService {

  //#region Methods

  // Load module description asynchronously.
  loadModuleDescriptionAsync(): Observable<string>;

  //#endregion

}
