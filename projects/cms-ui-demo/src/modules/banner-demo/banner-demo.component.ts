import {Component, Inject, OnInit} from '@angular/core';
import {DEMO_LAYOUT_SERVICE_PROVIDER} from '../../constants/injection-token.constant';
import {IDemoLayoutService} from '../../services/interfaces/demo-layout-service.interface';
import {v4 as uuid} from 'uuid';
import {BANNER_SERVICE_PROVIDER, IBannerService} from '@cms-ui/core';
import {AlertBannerSettings} from '../../models/banners/alert-banner-settings';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'banner-demo',
  templateUrl: 'banner-demo.component.html',
  styleUrls: ['banner-demo.component.scss']
})
export class BannerDemoComponent implements OnInit {

  //#region Properties

  public readonly insideComponentBannerId = uuid();

  public readonly stackableBannerId;

  //#endregion

  //#region Constructor

  public constructor(@Inject(DEMO_LAYOUT_SERVICE_PROVIDER) protected demoLayoutService: IDemoLayoutService,
                     @Inject(BANNER_SERVICE_PROVIDER) protected bannerService: IBannerService) {
    this.stackableBannerId = uuid();
  }

  //#endregion

  //#region Methods

  public ngOnInit(): void {
    this.demoLayoutService.setTitle('Banner');
    this.demoLayoutService.setSecondaryTitle('Demo');
  }

  public displayBanner(): void {
    const settings = new AlertBannerSettings('Click on the banner to dismiss it');
    settings.clickHandler = (): void => {
      this.bannerService.deleteBanner(undefined, this.insideComponentBannerId);
    };

    this.bannerService.addBanner(settings, this.insideComponentBannerId);
  }

  public displayStackableBanner(): void {

    console.log(`stackableBannerId = ${this.stackableBannerId}`);

    for (let i = 0; i < 10; i++) {
      const settings = new AlertBannerSettings(`This is banner number: ${i}`);
      settings.clickHandler = (): void => {
        console.log(`id = ${settings.id}`);
        this.bannerService.deleteBanner(settings.id, this.stackableBannerId);
      };

      this.bannerService.addBanner(settings, this.stackableBannerId);
    }
  }

  public deleteStackableBannerMessages(): void {
    this.bannerService.deleteBanner(undefined, this.stackableBannerId);
  }

  //#endregion
}
