import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {findLastIndex} from 'lodash';
import {IBannerService} from '../interfaces/banners/banner-service.interface';
import {IBannerDisplayRequest} from '../../models/interfaces/banners/banner-display-request.interface';
import {IBannerDeleteRequest} from '../../models/interfaces/banners/banner-delete-request.interface';
import {IBannerNextDisplayRequest} from '../../models/interfaces/banners/banner-next-display-request.interface';
import {IBannerSettings} from '../../models/interfaces/banners/banner-settings.interface';

@Injectable()
export class BannerService implements IBannerService {

  //#region Properties

  // List of request about banner display.
  // tslint:disable-next-line:variable-name
  private readonly _bannerDisplayRequests: IBannerDisplayRequest[];

  // Raise an event about banner display request.
  // tslint:disable-next-line:variable-name
  private readonly _bannerDisplayRequestSubject: Subject<IBannerDisplayRequest>;

  // Raise an event about banner delete request.
  // tslint:disable-next-line:variable-name
  private readonly _bannerDisplayDeleteSubject: Subject<IBannerDeleteRequest[]>;

  // tslint:disable-next-line:variable-name
  private readonly _displayNextBannerSubject: Subject<IBannerNextDisplayRequest>;

  // Raised when a banner display is requested.
  public readonly bannerDisplayRequested: Observable<IBannerDisplayRequest>;

  // Raised when  banners deletion is requested.
  public readonly bannerDisplayDeleted: Observable<IBannerDeleteRequest[]>;

  // Raised when next banner should be displayed.
  public readonly nextBannerDisplayRequested: Observable<IBannerNextDisplayRequest>;

  //#endregion

  //#region Constructor

  public constructor() {

    // Properties initialization.
    this._bannerDisplayRequests = [];

    this._bannerDisplayRequestSubject = new ReplaySubject<IBannerDisplayRequest>(1);
    this._bannerDisplayDeleteSubject = new ReplaySubject<IBannerDeleteRequest[]>(1);
    this._displayNextBannerSubject = new ReplaySubject<IBannerNextDisplayRequest>(1);

    this.bannerDisplayRequested = this._bannerDisplayRequestSubject.asObservable();
    this.bannerDisplayDeleted = this._bannerDisplayDeleteSubject.asObservable();
    this.nextBannerDisplayRequested = this._displayNextBannerSubject.asObservable();
  }

  //#endregion

  //#region Methods

  // Display banner using specific settings.
  // If container id is defined, only the contain whose id matches will display the banner.
  public addBanner(settings: IBannerSettings, containerId?: string): void {
    const request: IBannerDisplayRequest = {
      containerId,
      settings
    };

    this._bannerDisplayRequests.push(request);
    this._bannerDisplayRequestSubject.next(request);

    // // Only one banner has been added into list.
    // // Display it right now.
    // if (this.getContainerBannerRequests(containerId) === 1) {
    //   this.displayNextBanner(containerId);
    // }
  }

  // Find and delete banner by id.
  // No id is defined, all banner will be deleted.
  public deleteBanner(id?: string, containerId?: string): void {
    let index = 0;
    const deletedRequests = [];

    while (index < this._bannerDisplayRequests.length) {
      const request = this._bannerDisplayRequests[index];

      // Ids dont match.
      if (id && request.settings.id !== id) {
        index++;
        continue;
      }

      // Container ids dont match.
      if (containerId && request.containerId !== containerId) {
        index++;
        continue;
      }

      this._bannerDisplayRequests.splice(index, 1);
      const deletedRequest: IBannerDeleteRequest = {
        bannerId: id,
        containerId
      };

      deletedRequests.push(deletedRequest);
    }

    this._bannerDisplayDeleteSubject.next(deletedRequests);
  }

  // Get list of banners to be displayed.
  public getBanners(): IBannerDisplayRequest[] {
    return this._bannerDisplayRequests;
  }

  // Dequeue request.
  public dequeueRequest(containerId: string): IBannerDisplayRequest | null {
    if (!this._bannerDisplayRequests || !this._bannerDisplayRequests.length) {
      return null;
    }

    // Get first match item in the messages list.
    const itemIndex = this._bannerDisplayRequests.findIndex(x => x.containerId === containerId);
    if (itemIndex < 0) {
      return null;
    }

    const item = this._bannerDisplayRequests[itemIndex];
    this._bannerDisplayRequests.splice(itemIndex, 1);
    return item;
  }

  // Pop request.
  public popRequest(containerId: string): IBannerDisplayRequest | null {
    if (!this._bannerDisplayRequests || !this._bannerDisplayRequests.length) {
      return null;
    }

    // Find the last index of item.
    const lastIndex = findLastIndex(this._bannerDisplayRequests, x => x.containerId === containerId);
    if (lastIndex < 0) {
      return null;
    }

    const item = this._bannerDisplayRequests[lastIndex];
    this._bannerDisplayRequests.splice(lastIndex, 1);
    return item;
  }

  // Get the next banner and display it inside a specific container.
  // If no container id is defined, display next banner into every banner.
  public displayNextBanner(containerId?: string): void {
    const request: IBannerNextDisplayRequest = {
      containerId
    };

    this._displayNextBannerSubject.next(request);
  }

  // Get number of request about banner display.
  protected getContainerBannerRequests(containerId?: string): number {

    if (!containerId) {
      return this._bannerDisplayRequests.length;
    }

    return this._bannerDisplayRequests
        .filter(x => x.containerId === containerId)
        .length;
  }

  //#endregion
}
