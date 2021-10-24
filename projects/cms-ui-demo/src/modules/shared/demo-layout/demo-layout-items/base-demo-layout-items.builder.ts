import {Observable} from 'rxjs';
import {DemoLayoutItem} from './demo-layout-item';

export abstract class BaseDemoLayoutItemsBuilder {

  //#region Methods

  abstract loadAvailableDemoItemsAsync(): Observable<DemoLayoutItem[]>;

  //#endregion

}
