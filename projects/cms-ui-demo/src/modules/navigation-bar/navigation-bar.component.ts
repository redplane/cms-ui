import {Component, Inject} from '@angular/core';
import {ISmartNavigatorService, NavigateToScreenRequest, SMART_NAVIGATOR_PROVIDER} from '@cms-ui/core';
import {ScreenCodeConstant} from '../../constants/screen-code.constant';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'navigation-bar',
  templateUrl: 'navigation-bar.component.html',
  styleUrls: ['navigation-bar.component.scss']
})
export class NavigationBarComponent {

  //#region Constructor

  public constructor(@Inject(SMART_NAVIGATOR_PROVIDER) protected smartNavigatorService: ISmartNavigatorService) {
  }

  //#endregion

  //#region Methods

  public clickGoToLanding(event: Event): void {

    if (event) {
      event.preventDefault();
    }

    this.smartNavigatorService
      .navigateToScreenAsync(new NavigateToScreenRequest(ScreenCodeConstant.landing))
      .subscribe();
  }

  //#endregion
}
