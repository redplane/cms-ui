import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {IBannerService} from '../interfaces/banners/banner-service.interface';
import {IDeleteBannerRequest} from '../../models/interfaces/banners/delete-banner-content-request.interface';
import {IBannerNextDisplayRequest} from '../../models/interfaces/banners/display-next-banner-content-request.interface';
import { IDisplayBannerRequest } from '../../models/interfaces/banners/add-banner-content-request.interface';
import { IBannerContentSettings } from '../../models/interfaces/banners/banner-content-settings.interface';

@Injectable()
export class BannerService implements IBannerService {

  //#region Properties


  // Raise an event about banner display request.
  // tslint:disable-next-line:variable-name
  private readonly _bannerDisplayRequestSubject: Subject<IDisplayBannerRequest>;

  // Raise an event about banner delete request.
  // tslint:disable-next-line:variable-name
  private readonly _deleteRequestSubject: Subject<IDeleteBannerRequest>;

  // tslint:disable-next-line:variable-name
  private readonly _displayNextSubject: Subject<IBannerNextDisplayRequest>;

  // Raised when a banner display is requested.
  public readonly addedRequestEvent: Observable<IDisplayBannerRequest>;

  // Raised when  banners deletion is requested.
  public readonly deleteRequestEvent: Observable<IDeleteBannerRequest>;

  // Raised when next banner should be displayed.
  public readonly nextBannerDisplayRequested: Observable<IBannerNextDisplayRequest>;

  //#endregion

  //#region Constructor

  public constructor() {

    this._bannerDisplayRequestSubject = new ReplaySubject<IDisplayBannerRequest>(1);
    this._deleteRequestSubject = new ReplaySubject<IDeleteBannerRequest>(1);
    this._displayNextSubject = new ReplaySubject<IBannerNextDisplayRequest>(1);

    this.addedRequestEvent = this._bannerDisplayRequestSubject.asObservable();
    this.deleteRequestEvent = this._deleteRequestSubject.asObservable();
    this.nextBannerDisplayRequested = this._displayNextSubject.asObservable();
  }

  //#endregion

  //#region Methods

  // Display banner using specific settings.
  // If container id is defined, only the contain whose id matches will display the banner.
  public addBanner(settings: IBannerContentSettings, containerId?: string): string {
    const request: IDisplayBannerRequest = {
      id: settings.id,
      containerId,
      settings
    };

    this._bannerDisplayRequestSubject.next(request);
    return request.id;
  }

  // Find and delete banner by id.
  // No id is defined, all banner will be deleted.
  public deleteBanner(id?: string, containerId?: string): void {

    const deleteRequest: IDeleteBannerRequest = {
      id,
      containerId
    };

    this._deleteRequestSubject.next(deleteRequest);
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
