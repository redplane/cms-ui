export class DisplaySpinnerRequest {

  //#region Properties

  public readonly id: string;

  public readonly containerId: string;

  //#endregion

  //#region Constructor

  public constructor(id: string, containerId: string) {
    this.id = id;
    this.containerId = containerId;
  }

  //#endregion

}
