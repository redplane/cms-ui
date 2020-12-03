export interface ITimeoutAction {

  //#region Properties

  // Duration the task takes.
  duration: number;

  // Action which will be done on timeout.
  action: () => void;

  //#endregion
}
