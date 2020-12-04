import {IBannerContentSettings} from '../../../models/interfaces/banners/banner-content-settings.interface';

export interface IBannerService {

  //#region Methods

  // Display banner in a banner container.
  addBanner(settings: IBannerContentSettings, containerId?: string): string;

  // Find the banner by using specific id and delete it.
  // If id is not defined, delete all banners.
  // Deleted banners will be removed from view also.
  deleteBanner(id?: string, containerId?: string): void;

  // Get the next banner in the list and display it inside a container.
  displayNextBanner(containerId?: string): void;

  //#endregion
}
