import {Inject, Injectable, Optional} from '@angular/core';
import {DEMO_LAYOUT_SETTINGS} from '../../../constants/injectors';
import {DemoLayoutSetting} from '../../../models/demo-layout-setting';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {merge as lodashMerge} from 'lodash-es';
import {SideBarSetting} from '../../../side-bar-setting';

@Injectable()
export class UiModulePageService {

  //#region Properties

  // tslint:disable-next-line:variable-name
  private _setting: DemoLayoutSetting;

  // tslint:disable-next-line:variable-name
  private readonly _settingChangedSubject: Subject<DemoLayoutSetting>;

  //#endregion

  //#region Constructor

  public constructor(@Optional() @Inject(DEMO_LAYOUT_SETTINGS)
                     protected demoLayoutSetting: DemoLayoutSetting) {

    this._setting = new DemoLayoutSetting();
    this._settingChangedSubject = new ReplaySubject(1);
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

  //#endregion

}
