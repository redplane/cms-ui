import {TypedChannelEvent} from 'ngrx-message-bus';
import {DetailedUiModuleSelectedMessage} from '../detailed-ui-module-selected-message';
import {MessageChannels} from '../../../constants/channel-events/message-channels';
import {UiModuleMessageEvents} from '../../../constants/channel-events/ui-module-message-events';

export class DetailedUiModuleSelectedChannelEvent extends TypedChannelEvent<DetailedUiModuleSelectedMessage>{

  //#region Properties

  public readonly channelName: string;

  public readonly eventName: string;

  //#endregion

  //#region Constructor

  public constructor() {
    super();

    this.channelName = MessageChannels.uiModule;
    this.eventName = UiModuleMessageEvents.detailedUiModuleSelected;
  }

  //#endregion
}
