export interface IDemoLayoutService {

  //#region Properties

  readonly id: string;

  //#endregion

  //#region Methods

  // Update side bar items.
  setSidebar(): void;

  // Setup title.
  setTitle(title: string): void;

  // Set secondary title.
  setSecondaryTitle(title: string): void;

  //#endregion
}
