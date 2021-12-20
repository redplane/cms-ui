import {TypedChannelEvent} from 'ngrx-message-bus';
import {DetailedUiModuleSectionSelectedMessage} from '../detailed-ui-module-section-selected-message';
import {MessageChannels} from '../../../constants/channel-events/message-channels';
import {SectionMessageEvents} from '../../../constants/channel-events/section-message-events';

export class DetailedUiModuleSectionSelectedChannelEvent
  extends TypedChannelEvent<DetailedUiModuleSectionSelectedMessage> {

  //#region Properties

  public readonly channelName: string;

  public readonly eventName: string;

  //#endregion

  //#region Constructor

  public constructor() {
    super();
    this.channelName = MessageChannels.section;
    this.eventName = SectionMessageEvents.detailedUiModuleSectionSelected;
  }

  //#endregion

}
