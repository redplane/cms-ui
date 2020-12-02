import {IBannerSettings} from './banner-settings.interface';

export interface IBannerDisplayRequest {

  //#region Properties

  // Id of a container to be displayed a banner.
  containerId?: string;

  // Setting of displayed banner.
  settings: IBannerSettings;

  //#endregion

}
