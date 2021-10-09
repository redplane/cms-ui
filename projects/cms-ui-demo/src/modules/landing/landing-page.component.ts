import {ChangeDetectionStrategy, Component, HostBinding, Inject} from '@angular/core';
import {ISmartNavigatorService, NavigateToScreenRequest, SMART_NAVIGATOR_PROVIDER} from '@cms-ui/core';
import {ScreenCodes} from '../../constants/screen.codes';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'landing-page',
  templateUrl: 'landing-page.component.html',
  styleUrls: ['landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent {

  //#region Accessor

  @HostBinding('class')
  public get hostClass(): string {
    return 'page';
  }

  public get screenCodes(): typeof ScreenCodes {
    return ScreenCodes;
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(SMART_NAVIGATOR_PROVIDER) protected smartNavigatorService: ISmartNavigatorService) {
  }

  //#endregion

  //#region Methods

  public clickDialogLearnMore(): void {
    this.smartNavigatorService.navigateToScreenAsync(new NavigateToScreenRequest(ScreenCodes.dialogDemo))
      .subscribe();
  }

  //#endregion
}
