import {Component, HostBinding, Inject} from '@angular/core';
import {SMART_NAVIGATOR_PROVIDER} from '../../../../cms-ui/src/constants';
import {ISmartNavigatorService} from '../../../../cms-ui/src/services';
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

  //#endregion
}
