import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Inject, OnDestroy, OnInit} from '@angular/core';
import {SideBarMenuItem} from '../../../models/side-bar-menu-item';
import {DEMO_LAYOUT_SERVICE_PROVIDER} from '../../../constants/injection-token.constant';
import {IDemoLayoutService} from '../../../services/interfaces/demo-layout-service.interface';
import {Subscription} from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'demo-layout',
  templateUrl: 'demo-layout.component.html',
  styleUrls: ['demo-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoLayoutComponent implements OnInit, OnDestroy {

  //#region Properties

  // List of menu items which will be displayed on side bar.
  // tslint:disable-next-line:variable-name
  private _sidebarMenuItems: SideBarMenuItem[];

  // Main title.
  // tslint:disable-next-line:variable-name
  private _title: string;

  // Secondary title.
  // tslint:disable-next-line:variable-name
  private _secondaryTitle: string;

  // Subscription watch list.
  // tslint:disable-next-line:variable-name
  private readonly _subscription: Subscription;

  //#endregion

  //#region Accessors

  @HostBinding('class')
  public get hostClass(): string {
    return 'page';
  }

  // List of menu items to be displayed.
  public get sidebarMenuItems(): SideBarMenuItem[] {
    return this._sidebarMenuItems;
  }

  // Primary title.
  public get title(): string {
    return this._title;
  }

  // Secondary title.
  public get secondaryTitle(): string {
    return this._secondaryTitle;
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(DEMO_LAYOUT_SERVICE_PROVIDER) protected demoLayoutService: IDemoLayoutService,
                     protected changeDetectorRef: ChangeDetectorRef) {
    this._sidebarMenuItems = [];
    this._title = '';
    this._secondaryTitle = '';

    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycle

  public ngOnInit(): void {

    const hookSettingChangedSubscription = this.demoLayoutService
      .hookLayoutSettingsChanged()
      .subscribe(setting => {
        this._title = setting.title || '';
        this._secondaryTitle = setting.secondaryTitle || '';
        this.changeDetectorRef.detectChanges();
      });
    this._subscription.add(hookSettingChangedSubscription);

    const hookSideBarSettingChangedSubscription = this.demoLayoutService
      .hookSideBarSettingChanged()
      .subscribe(sideBarSetting => {
        this._sidebarMenuItems = sideBarSetting.items || [];
        this.changeDetectorRef.detectChanges();
      });
    this._subscription.add(hookSettingChangedSubscription);
  }

  public ngOnDestroy(): void {

    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }

  //#endregion

  //#region Methods

  public shouldSideBarAvailable(): boolean {
    if (!this._sidebarMenuItems || !this._sidebarMenuItems.length) {
      return false;
    }
    return true;
  }

  //#endregion
}
