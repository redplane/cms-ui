import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {IBannerService} from '../interfaces/banners/banner-service.interface';
import {IDeleteBannerRequest} from '../../models/interfaces/banners/delete-banner-request.interface';
import {IBannerNextDisplayRequest} from '../../models/interfaces/banners/banner-next-display-request.interface';
import {findLastIndex} from 'lodash-es';
import {IBannerSettings, IDisplayBannerRequest} from '../../models';

@Injectable()
export class BannerService implements IBannerService {

  //#region Properties

  // List of request about banner display.
  // tslint:disable-next-line:variable-name
  private readonly _displayRequests: IDisplayBannerRequest[];

  // Raise an event about banner display request.
  // tslint:disable-next-line:variable-name
  private readonly _bannerDisplayRequestSubject: Subject<IDisplayBannerRequest>;

  // Raise an event about banner delete request.
  // tslint:disable-next-line:variable-name
  private readonly _deleteRequestSubject: Subject<IDeleteBannerRequest>;

  // tslint:disable-next-line:variable-name
  private readonly _displayNextSubject: Subject<IBannerNextDisplayRequest>;

  // Raised when a banner display is requested.
  public readonly bannerDisplayRequested: Observable<IDisplayBannerRequest>;

  // Raised when  banners deletion is requested.
  public readonly deleteRequestEvent: Observable<IDeleteBannerRequest>;

  // Raised when next banner should be displayed.
  public readonly nextBannerDisplayRequested: Observable<IBannerNextDisplayRequest>;

  //#endregion

  //#region Constructor

  public constructor() {

    // Properties initialization.
    this._displayRequests = [];

    this._bannerDisplayRequestSubject = new ReplaySubject<IDisplayBannerRequest>(1);
    this._deleteRequestSubject = new ReplaySubject<IDeleteBannerRequest>(1);
    this._displayNextSubject = new ReplaySubject<IBannerNextDisplayRequest>(1);

    this.bannerDisplayRequested = this._bannerDisplayRequestSubject.asObservable();
    this.deleteRequestEvent = this._deleteRequestSubject.asObservable();
    this.nextBannerDisplayRequested = this._displayNextSubject.asObservable();
  }

  //#endregion

  //#region Methods

  // Display banner using specific settings.
  // If container id is defined, only the contain whose id matches will display the banner.
  public addBanner(settings: IBannerSettings, containerId?: string): string {
    const request: IDisplayBannerRequest = {
      id: settings.id,
      containerId,
      settings
    };

    this._displayRequests.push(request);
    this._bannerDisplayRequestSubject.next(request);

    // // Only one banner has been added into list.
    // // Display it right now.
    // if (this.getContainerBannerRequests(containerId) === 1) {
    //   this.displayNextBanner(containerId);
    // }

    return request.id;
  }

  // Find and delete banner by id.
  // No id is defined, all banner will be deleted.
  public deleteBanner(id?: string, containerId?: string): void {

    let index = 0;
    while (index < this._displayRequests.length) {
      const request = this._displayRequests[index];

      // Ids dont match.
      if (id && request.id !== id) {
        index++;
        continue;
      }

      // Container ids dont match.
      if (containerId && request.containerId !== containerId) {
        index++;
        continue;
      }

      this._displayRequests.splice(index, 1);
    }

    const deleteRequest: IDeleteBannerRequest = {
      id,
      containerId
    };

    this._deleteRequestSubject.next(deleteRequest);
  }

  // Dequeue request.
  public dequeueRequest(containerId: string): IDisplayBannerRequest | null {
    if (!this._displayRequests || !this._displayRequests.length) {
      return null;
    }

    // Get first match item in the messages list.
    const itemIndex = this._displayRequests.findIndex(x => x.containerId === containerId);
    if (itemIndex < 0) {
      return null;
    }

    const item = this._displayRequests[itemIndex];
    this._displayRequests.splice(itemIndex, 1);
    return item;
  }

  // Pop request.
  public popRequest(containerId: string): IDisplayBannerRequest | null {
    if (!this._displayRequests || !this._displayRequests.length) {
      return null;
    }

    // Find the last index of item.
    const lastIndex = findLastIndex(this._displayRequests, x => x.containerId === containerId);
    if (lastIndex < 0) {
      return null;
    }

    const item = this._displayRequests[lastIndex];
    this._displayRequests.splice(lastIndex, 1);
    return item;
  }

  // Get the next banner and display it inside a specific container.
  // If no container id is defined, display next banner into every banner.
  public displayNextBanner(containerId?: string): void {
    const request: IBannerNextDisplayRequest = {
      containerId
    };

    this._displayNextSubject.next(request);
  }

  //#endregion
}
