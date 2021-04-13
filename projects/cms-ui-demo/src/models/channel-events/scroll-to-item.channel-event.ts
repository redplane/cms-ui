import {TypedChannelEvent} from 'ngrx-message-bus';

export class ScrollToItemChannelEvent extends TypedChannelEvent<string> {
  //#region Properties
  public readonly channelName: string;

  public readonly eventName: string;
  //#endregion

  //#region Constructor
  public constructor() {
    super();
    this.channelName = 'LEFT_MENU_SCROLL_EVENT';
    this.eventName = 'SCROLL_TO_ITEM_EVENT';
  }

  //#endregion
}
