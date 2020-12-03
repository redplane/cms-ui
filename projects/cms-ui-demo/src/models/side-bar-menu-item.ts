export class SideBarMenuItem {

  //#region Properties

  public readonly id: string;

  // Menu item title.
  public readonly title: string;

  // Whether item is activated or not.
  public isActiveHandler: (() => boolean) | null;

  //#endregion

  //#region Constructor

  public constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
    this.isActiveHandler = null;
  }

  //#endregion

}
