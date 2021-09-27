import {UrlTree} from '@angular/router';

export class SideBarMenuItem {

  //#region Properties

  // Menu item title.
  public readonly title: string;

  public readonly routerLink: UrlTree;

  public readonly routerLinkActive: string;

  //#endregion

  //#region Constructor

  public constructor(title: string, routerLink: UrlTree, routerLinkActive: string = 'active') {
    this.title = title;
    this.routerLink = routerLink;
    this.routerLinkActive = routerLinkActive;
  }

  //#endregion

}
