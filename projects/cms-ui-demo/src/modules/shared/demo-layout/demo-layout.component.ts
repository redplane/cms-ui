import {Component, HostBinding} from '@angular/core';
import {SideBarMenuItem} from '../../../models/side-bar-menu-item';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'demo-layout',
  templateUrl: 'demo-layout.component.html',
  styleUrls: ['demo-layout.component.scss']
})
export class DemoLayoutComponent {

  //#region Properties

  // List of menu items which will be displayed on side bar.
  // tslint:disable-next-line:variable-name
  private _sidebarMenuItems: SideBarMenuItem[];

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

  //#endregion

  //#region Constructor

  public constructor() {
    this._sidebarMenuItems = [];
  }

  //#endregion

  //#region Methods

  public isSidebarAvailable(): boolean {

    if (!this.sidebarMenuItems || !this.sidebarMenuItems.length) {
      return false;
    }

    return true;
  }

  // Whether side bar item is active or not.
  public isSidebarItemActive(item: SideBarMenuItem): boolean {

    if (!item || !item.isActiveHandler) {
      return false;
    }

    return item.isActiveHandler();
  }

  //#endregion
}
