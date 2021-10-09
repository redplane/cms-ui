import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {ResizedEvent} from 'angular-resize-event';
import {DOCUMENT} from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'master-layout',
  templateUrl: 'master-layout.component.html',
  styleUrls: ['master-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasterLayoutComponent {

  //#region Properties

  private _navigationBarHeight = 0;

  private _isSidebarExpanded = false;

  //#endregion

  //#region Accessors

  public get isSidebarExpanded(): boolean {
    return this._isSidebarExpanded;
  }

  public get navigationBarHeight(): number {
    return this._navigationBarHeight;
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(DOCUMENT) protected readonly document: Document) {
  }

  //#endregion

  //#region Life cycle

  //#endregion

  //#region Methods

  public doNavigationBarResizeEventHandle(event: ResizedEvent): void {
    this._navigationBarHeight = event.newHeight;
    console.log(event.newHeight);
  }

  public doSidebarExpandedStatusUpdate(): void {
    this._isSidebarExpanded = !this._isSidebarExpanded;
  }

  public closeSideBar(event: HTMLElement): void {

    if (!this._isSidebarExpanded) {
      return;
    }

    console.log(event);
    this._isSidebarExpanded = false;
  }

  //#endregion
}
