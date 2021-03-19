export class DeleteSpinnerRequest {

  //#region Properties

  // Request to be deleted.
  public id?: string;

  // Id of container whose spinner must be deleted.
  public containerId: string;

  //#endregion

  //#region Constructor

  public constructor(containerId: string, id?: string) {
    this.containerId = containerId;
    this.id = id;
  }

  //#endregion

}
