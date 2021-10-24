import {Observable} from 'rxjs';

export interface IDemoPageService {

  //#region Methods

  // Load module description asynchronously.
  loadDemoContentAsync(): Observable<string>;

  //#endregion

}
