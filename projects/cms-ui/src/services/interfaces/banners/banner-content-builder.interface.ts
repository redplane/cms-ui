import {Observable} from 'rxjs';
import {ComponentRef} from '@angular/core';
import {IBannerContentSettings} from '../../../models/interfaces/banners/banner-content-settings.interface';
import {IBannerContentComponent} from '../../../models/interfaces/banners/banner-content-component.interface';

export interface IBannerContentBuilder {

  //#region Methods

  // Whether this builder can build a banner by using this setting or not.
  canBuildAsync(settings: IBannerContentSettings): Observable<boolean>;

  // Build the banner asynchronously.
  buildAsync(settings: IBannerContentSettings): Observable<ComponentRef<IBannerContentComponent>>;

  //#endregion

}
