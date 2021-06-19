import {Component, Inject} from '@angular/core';
import {v4 as uuid} from 'uuid';
import {BANNER_SERVICE_PROVIDER, IBannerService} from '@cms-ui/core';
import {WarningBannerContentSettings} from '../../../models/banners/warning-banner-content-settings';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'child-banner-demo',
  templateUrl: 'child-banner-demo.component.html',
  styleUrls: ['child-banner-demo.component.scss']
})
export class ChildBannerDemoComponent {

  //#region Properties

  public readonly childBannerId: string;

  //#endregion

  //#region Constructor

  public constructor(@Inject(BANNER_SERVICE_PROVIDER) protected readonly bannerService: IBannerService) {
    this.childBannerId = uuid();
  }

  //#endregion

  //#region Methods

  public displayChildBanner(): void {
    const settings = new WarningBannerContentSettings('Click on the banner to dismiss it');
    settings.clickHandler = (): void => {
      this.bannerService.deleteBanner(undefined, this.childBannerId);
    };

    this.bannerService.addBanner(settings, this.childBannerId);
  }

  public deleteChildBannerMessages(): void {
    this.bannerService.deleteBanner(undefined, this.childBannerId);
  }

  //#endregion
}
