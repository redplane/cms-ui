import {DemoLayoutSetting} from '../../models/demo-layout-setting';
import {Observable} from 'rxjs';
import {SideBarSetting} from '../../side-bar-setting';

export interface IDemoLayoutService {

  //#region Methods

  // Update setting.
  changeLayoutSetting(value: DemoLayoutSetting): void;

  // Called when setting is changed.
  hookLayoutSettingsChanged(): Observable<DemoLayoutSetting>;

  // Update side bar setting.
  changeSideBarSetting(value: SideBarSetting): void;

  // Hook side bar setting
  hookSideBarSettingChanged(): Observable<SideBarSetting>;

  //#endregion
}
