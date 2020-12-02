import {Observable} from 'rxjs';
import {IBannerDisplayRequest} from '../../../models/interfaces/banners/banner-display-request.interface';
import {IBannerDeleteRequest} from '../../../models/interfaces/banners/banner-delete-request.interface';
import {IBannerNextDisplayRequest} from '../../../models/interfaces/banners/banner-next-display-request.interface';
import {IBannerSettings} from '../../../models/interfaces/banners/banner-settings.interface';

export interface IBannerService {

  //#region Properties

  // Raised when a banner is requested to be displayed.
  bannerDisplayRequested: Observable<IBannerDisplayRequest>;

  // Raised when banner display request is deleted.
  bannerDisplayDeleted: Observable<IBannerDeleteRequest[]>;

  // Raised when next banner should be displayed.
  nextBannerDisplayRequested: Observable<IBannerNextDisplayRequest>;

  //#endregion

  //#region Methods

  // Display banner in a banner container.
  addBanner(settings: IBannerSettings, containerId?: string): void;

  // Get list banners to be displayed.
  getBanners(): IBannerDisplayRequest[];

  // Get the first request.
  dequeueRequest(containerId: string): IBannerDisplayRequest | null;

  // Get the last request.
  popRequest(containerId: string): IBannerDisplayRequest | null;

  // Find the banner by using specific id and delete it.
  // If id is not defined, delete all banners.
  // Deleted banners will be removed from view also.
  deleteBanner(id?: string, containerId?: string): void;

  // Get the next banner in the list and display it inside a container.
  displayNextBanner(containerId?: string): void;

  //#endregion
}
