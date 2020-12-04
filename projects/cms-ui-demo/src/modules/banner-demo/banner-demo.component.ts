import {Component, Inject, OnInit} from '@angular/core';
import {DEMO_LAYOUT_SERVICE_PROVIDER} from '../../constants/injection-token.constant';
import {IDemoLayoutService} from '../../services/interfaces/demo-layout-service.interface';
import {v4 as uuid} from 'uuid';
import {BANNER_SERVICE_PROVIDER, IBannerService} from '@cms-ui/core';
import {AlertBannerContentSettings} from '../../models/banners/alert-banner-content-settings';
import {InfoBannerContentSettings} from '../../models/banners/info-banner-content-settings';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'banner-demo',
  templateUrl: 'banner-demo.component.html',
  styleUrls: ['banner-demo.component.scss']
})
export class BannerDemoComponent implements OnInit {

  //#region Properties

  public readonly insideComponentBannerId: string;

  public readonly timeoutBannerId: string;

  public readonly stackableBannerId: string;

  public readonly queuedBannerId: string;

  public readonly multiKindBannerId: string;

  public readonly timeoutInSeconds: number;

  //#endregion

  //#region Constructor

  public constructor(@Inject(DEMO_LAYOUT_SERVICE_PROVIDER) protected demoLayoutService: IDemoLayoutService,
                     @Inject(BANNER_SERVICE_PROVIDER) protected bannerService: IBannerService) {
    this.insideComponentBannerId = uuid();
    this.timeoutBannerId = uuid();
    this.stackableBannerId = uuid();
    this.queuedBannerId = uuid();
    this.multiKindBannerId = uuid();

    this.timeoutInSeconds = 5;
  }

  //#endregion

  //#region Methods

  public ngOnInit(): void {
    this.demoLayoutService.setTitle('Banner');
    this.demoLayoutService.setSecondaryTitle('Demo');
  }

  public displayBanner(): void {
    const settings = new AlertBannerContentSettings('Click on the banner to dismiss it');
    settings.clickHandler = (): void => {
      this.bannerService.deleteBanner(undefined, this.insideComponentBannerId);
    };

    this.bannerService.addBanner(settings, this.insideComponentBannerId);
  }

  public displayTimeoutBanner(): void {

    for (let i = 0; i < 10; i++) {
      const settings = new AlertBannerContentSettings(
        `Next banner will be displayed when timeout occurs. Timeout: ${this.timeoutInSeconds} seconds. Banner number: ${i}`);
      settings.timeout = {
        duration: this.timeoutInSeconds * 1000,
        action: () => {
          this.bannerService.displayNextBanner(this.timeoutBannerId);
        }
      };
      this.bannerService.addBanner(settings, this.timeoutBannerId);
    }
  }

  public displayStackableBanner(): void {
    for (let i = 0; i < 10; i++) {
      const settings = new AlertBannerContentSettings(`This is banner number: ${i}. Click on this banner to display the next banner.`);
      settings.clickHandler = (): void => {
        this.bannerService.displayNextBanner(this.stackableBannerId);
      };

      this.bannerService.addBanner(settings, this.stackableBannerId);
    }
  }

  public deleteStackableBannerMessages(): void {
    this.bannerService.deleteBanner(undefined, this.stackableBannerId);
  }

  public displayQueuedBanner(): void {
    for (let i = 0; i < 10; i++) {
      const settings = new AlertBannerContentSettings(`This is banner number: ${i}. Click on this banner to display the next banner.`);
      settings.clickHandler = (): void => {
        this.bannerService.displayNextBanner(this.queuedBannerId);
      };

      this.bannerService.addBanner(settings, this.queuedBannerId);
    }
  }

  public displayMultiKindBanner(): void {

    for (let i = 0; i < 10; i++) {
      if (i % 2 < 1) {
        const alertBannerContentSettings = new AlertBannerContentSettings(`This is alert banner. Number: ${i}. Click on this banner to display the next one`);
        alertBannerContentSettings.clickHandler = (): void => {
          this.bannerService.displayNextBanner(this.multiKindBannerId);
        };

        this.bannerService.addBanner(alertBannerContentSettings, this.multiKindBannerId);
      } else {
        const infoBannerContentSettings = new InfoBannerContentSettings(`This is info banner. Number: ${i}. Click on this banner to display the next one.`);
        infoBannerContentSettings.clickHandler = (): void => {
          this.bannerService.displayNextBanner(this.multiKindBannerId);
        };

        this.bannerService.addBanner(infoBannerContentSettings, this.multiKindBannerId);
      }
    }
  }

  public deleteQueuedBannerMessages(): void {
    this.bannerService.deleteBanner(undefined, this.queuedBannerId);
  }

  public deleteMultiKindBannerMessages(): void {
    this.bannerService.deleteBanner(undefined, this.multiKindBannerId);
  }

  //#endregion
}
