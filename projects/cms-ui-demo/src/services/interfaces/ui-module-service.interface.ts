import {UiModule} from '../../models/ui-module';
import {LoadUiModuleViewModel} from '../../view-models/ui-modules/load-ui-module.view-model';
import {UiModuleViewModel} from '../../view-models/ui-modules/ui-module.view-model';
import {Observable} from 'rxjs';

export interface IUiModuleService {

  //#region Methods

  // Load ui module by id asynchronously.
  loadUiModuleByIdAsync(id: string): Observable<UiModuleViewModel>;

  // Load demo modules asynchronously.
  loadUiModulesAsync(model: LoadUiModuleViewModel): Promise<UiModule[]>;

  //#endregion

}
