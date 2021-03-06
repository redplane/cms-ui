import {ITimeoutAction} from '../timeout-action.interface';

export interface IBannerContentSettings {

  //#region Properties

  readonly id: string;

  timeout?: ITimeoutAction;

  // Called when banner is clicked.
  clickHandler?: (bannerId: string, close: () => void) => void;

  // Called when click event is emitted outside banner.
  clickOutsideHandler?: (bannerId: string, close: () => void) => void;

  //#endregion

}
