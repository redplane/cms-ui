export class DemoLayoutItem {

  //#region Properties

  public title?: string;

  public routerLink?: string;

  public routerLinkActive?: string;

  public routerLinkActiveOptions?: {
    exact: boolean;
  };

  public children?: DemoLayoutItem[];

  //#endregion

}
