export class DialogResult<T> {

  //#region Properties

  // tslint:disable-next-line:variable-name
  private readonly _action: string;

  // tslint:disable-next-line:variable-name
  private readonly _data: T;

  //#endregion

  //#region Accessor

  // Modal dialog action.
  public get action(): string {
    return this._action;
  }

  // Data.
  public get data(): T {
    return this._data;
  }

  //#endregion

  //#region Constructor

  constructor(action: string, data: T) {
    this._action = action;
    this._data = data;
  }

  //#endregion

}
