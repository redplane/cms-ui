export class SpinnerDisplay {

  //#region Properties

  public readonly historicalRequestIds: string[];

  //#endregion

  //#region Constructor

  public constructor(public readonly containerId: string) {
    this.historicalRequestIds = [];
  }

  //#endregion

}
