import {Component, HostBinding, Inject} from '@angular/core';
import {SMART_NAVIGATOR_PROVIDER} from '@cms-ui/core';
import {ISmartNavigatorService} from '@cms-ui/core';
import {ScreenCodeConstant} from '../../constants/screen-code.constant';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'landing-page',
  templateUrl: 'landing-page.component.html',
  styleUrls: ['landing-page.component.scss']
})
export class LandingPageComponent {

  //#region Accessor

  @HostBinding('class')
  public get hostClass(): string {
    return 'page';
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(SMART_NAVIGATOR_PROVIDER) protected smartNavigatorService: ISmartNavigatorService) {
  }

  //#endregion

  //#region Methods

  public accessSpinnerDemoPage(): void {
    this.smartNavigatorService.navigateToScreenAsync(ScreenCodeConstant.spinnerDemo)
      .subscribe();
  }

  public accessBannerDemoPage(): void {
    this.smartNavigatorService.navigateToScreenAsync(ScreenCodeConstant.bannerDemo)
      .subscribe();
  }

  public clickValidationSummarizerLearnMore(): void {
    this.smartNavigatorService.navigateToScreenAsync(ScreenCodeConstant.validationSummarizerDemo)
      .subscribe();
  }

  public clickDialogLearnMore(): void {
    this.smartNavigatorService.navigateToScreenAsync(ScreenCodeConstant.dialogDemo)
      .subscribe();
  }

  //#endregion
}
