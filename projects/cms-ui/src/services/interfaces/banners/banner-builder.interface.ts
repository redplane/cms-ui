import {Observable} from 'rxjs';
import {ComponentRef} from '@angular/core';
import {IBannerSettings} from '../../../models/interfaces/banners/banner-settings.interface';
import {IBannerComponent} from '../../../models/interfaces/banners/banner-component.interface';

export interface IBannerBuilder {

  //#region Methods

  // Whether this builder can build a banner by using this setting or not.
  canBuildAsync(settings: IBannerSettings): Observable<boolean>;

  // Build the banner asynchronously.
  buildAsync(settings: IBannerSettings): Observable<ComponentRef<IBannerComponent>>;

  //#endregion

}
