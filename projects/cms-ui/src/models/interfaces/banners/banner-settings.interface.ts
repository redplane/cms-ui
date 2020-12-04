import {ITimeoutAction} from '../timeout-action.interface';

export interface IBannerSettings {

  //#region Properties

  readonly id: string;

  // Millisecond
  timeout?: ITimeoutAction;

  // Called when banner is clicked.
  clickHandler?: (bannerId: string, close: () => void) => void;

  // Called when click event is emitted outside banner.
  clickOutsideHandler?: (bannerId: string, close: () => void) => void;

  //#endregion

}
