import {IDemoLayoutService} from '../interfaces/demo-layout-service.interface';
import {Inject, Injectable, Optional} from '@angular/core';
import {DEMO_LAYOUT_SETTINGS} from '../../constants/injection-token.constant';
import {DemoLayoutSetting} from '../../models/demo-layout-setting';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {merge as lodashMerge} from 'lodash-es';
import {SideBarSetting} from '../../side-bar-setting';

@Injectable()
export class DemoLayoutService implements IDemoLayoutService {

  //#region Properties

  // tslint:disable-next-line:variable-name
  private _setting: DemoLayoutSetting;

  // tslint:disable-next-line:variable-name
  private _sideBarSetting: SideBarSetting;

  // tslint:disable-next-line:variable-name
  private readonly _settingChangedSubject: Subject<DemoLayoutSetting>;

  // tslint:disable-next-line:variable-name
  private readonly _sideBarSettingChangedSubject: Subject<SideBarSetting>;

  //#endregion

  //#region Constructor

  public constructor(@Optional() @Inject(DEMO_LAYOUT_SETTINGS)
                     protected demoLayoutSetting: DemoLayoutSetting) {

    this._setting = new DemoLayoutSetting();
    this._sideBarSetting = new SideBarSetting();

    this._settingChangedSubject = new ReplaySubject(1);
    this._sideBarSettingChangedSubject = new ReplaySubject(1);
  }

  //#endregion


  //#region Methods

  public hookLayoutSettingsChanged(): Observable<DemoLayoutSetting> {
    return this._settingChangedSubject.asObservable();
  }

  public changeLayoutSetting(value: DemoLayoutSetting): void {
    this._setting = lodashMerge(this._setting, value);
    this._settingChangedSubject.next(this._setting);
  }

  public changeSideBarSetting(value: SideBarSetting): void {
    this._sideBarSetting = lodashMerge(this._setting, value);
    this._sideBarSettingChangedSubject.next(this._sideBarSetting);
  }

  public hookSideBarSettingChanged(): Observable<SideBarSetting> {
    return this._sideBarSettingChangedSubject.asObservable();
  }

  //#endregion

}
