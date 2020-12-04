import {IBannerContentSettings} from './banner-content-settings.interface';

export interface IDisplayBannerRequest {

  //#region Properties

  id: string;

  // Id of a container to be displayed a banner.
  containerId?: string;

  // Setting of displayed banner.
  settings: IBannerContentSettings;

  //#endregion

}
