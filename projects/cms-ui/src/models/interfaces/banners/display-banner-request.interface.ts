import {IBannerSettings} from './banner-settings.interface';

export interface IDisplayBannerRequest {

  //#region Properties

  id: string;

  // Id of a container to be displayed a banner.
  containerId?: string;

  // Setting of displayed banner.
  settings: IBannerSettings;

  //#endregion

}
