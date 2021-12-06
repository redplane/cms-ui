import {Observable} from 'rxjs';
import {UiModule} from '../../models/ui-module';

export interface IDemoModuleService {

  //#region Methods

  // Load demo modules asynchronously.
  loadDemoModulesAsync(): Observable<UiModule[]>;

  //#endregion

}
