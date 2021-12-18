import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {ISmartNavigatorService, NavigateToScreenRequest, SMART_NAVIGATOR_SERVICE} from '@cms-ui/core';
import {ScreenCodes} from '../../../constants/screen.codes';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'navigation-bar',
  templateUrl: 'navigation-bar.component.html',
  styleUrls: ['navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent {

  //#region Constructor

  public constructor(@Inject(SMART_NAVIGATOR_SERVICE) protected smartNavigatorService: ISmartNavigatorService) {
  }

  //#endregion

  //#region Methods

  public clickGoToLanding(event: Event): void {

    if (event) {
      event.preventDefault();
    }

    this.smartNavigatorService
      .navigateToScreenAsync(new NavigateToScreenRequest(ScreenCodes.landing))
      .subscribe();
  }

  //#endregion
}
