import {IDemoLayoutService} from '../interfaces/demo-layout-service.interface';
import {Inject, Injectable, Optional} from '@angular/core';
import {DEMO_LAYOUT_SETTINGS} from '../../constants/injection-token.constant';
import {DemoLayoutSetting} from '../../models/demo-layout-setting';
import {Observable, ReplaySubject} from 'rxjs';
import {v4 as uuid} from 'uuid';

@Injectable()
export class DemoLayoutService implements IDemoLayoutService {

  //#region Properties

  // Subject which is for updating secondary title.
  // tslint:disable-next-line:variable-name
  private _secondaryTitleUpdatedSubject: ReplaySubject<string>;

  // Subject which is for updating title.
  // tslint:disable-next-line:variable-name
  private _titleUpdatedSubject: ReplaySubject<string>;

  public readonly id: string;

  // Event which will be raised when secondary title is updated.
  public readonly secondaryTitleUpdated: Observable<string>;

  // Event which will be raised when primary title is updated.
  public readonly titleUpdated: Observable<string>;

  //#endregion

  //#region Constructor

  public constructor(@Optional() @Inject(DEMO_LAYOUT_SETTINGS) protected demoLayoutSetting: DemoLayoutSetting) {

    if (this.demoLayoutSetting) {
      this.id = demoLayoutSetting.id;
    } else {
      this.id = uuid();
    }

    this._secondaryTitleUpdatedSubject = new ReplaySubject<string>();
    this.secondaryTitleUpdated = this._secondaryTitleUpdatedSubject.asObservable();

    this._titleUpdatedSubject = new ReplaySubject<string>();
    this.titleUpdated = this._titleUpdatedSubject.asObservable();
  }

  //#endregion

  //#region Methods

  public setSecondaryTitle(title: string): void {
    this._secondaryTitleUpdatedSubject.next(title);
  }

  public setSidebar(): void {
  }

  public setTitle(title: string): void {
    this._titleUpdatedSubject.next(title);
  }

  //#endregion
}
