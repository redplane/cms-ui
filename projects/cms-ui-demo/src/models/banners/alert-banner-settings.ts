import {IBannerSettings} from '@cms-ui/core';
import {v4 as uuid} from 'uuid';

export class AlertBannerSettings implements IBannerSettings {

  //#region Properties

  public readonly id: string;

  public message: string;

  // Handler for handle click event.
  // bannerId: Id of banner that action button is triggered.
  // close: Handler for triggering next banner to be displayed.
  public clickHandler?: (bannerId: string, close: () => void) => void;

  // Called when click event is emitted outside banner.
  public clickOutsideHandler?: (bannerId: string, close: () => void) => void;

  //#endregion

  //#region Constructor

  public constructor(message: string) {
    this.id = uuid();
    this.message = message;
    this.clickHandler = undefined;
    this.clickOutsideHandler = undefined;
  }

  //#endregion

}
