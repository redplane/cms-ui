import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DEMO_LAYOUT_SERVICE_PROVIDER} from '../../constants/injection-token.constant';
import {IDemoLayoutService} from '../../services/interfaces/demo-layout-service.interface';
import {ISmartNavigatorService, NavigateToScreenRequest, SMART_NAVIGATOR_PROVIDER} from '@cms-ui/core';
import {ScreenCodes} from '../../constants/screen.codes';
import {Subscription} from 'rxjs';
import {Navigator03NavigationRequest} from '../../models/smart-navigators/navigator-03.navigation-request';
import {DemoLayoutSetting} from '../../models/demo-layout-setting';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'smart-navigator-demo',
  templateUrl: 'smart-navigator-demo.component.html',
  styleUrls: ['./smart-navigator-demo.component.scss'],
})
export class SmartNavigatorDemoComponent implements OnInit, OnDestroy {

  //#region Properties

  // tslint:disable-next-line:variable-name
  protected _fourthTabNavigationRequest: Navigator03NavigationRequest;

  protected subscription: Subscription;

  //#endregion

  //#region Accessors

  public get ScreenCodes(): typeof ScreenCodes {
    return ScreenCodes;
  }

  public get fourthTabNavigationRequest(): NavigateToScreenRequest<void> {
    return this._fourthTabNavigationRequest;
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(DEMO_LAYOUT_SERVICE_PROVIDER) protected demoLayoutService: IDemoLayoutService,
                     @Inject(SMART_NAVIGATOR_PROVIDER) protected smartNavigatorService: ISmartNavigatorService) {

    this._fourthTabNavigationRequest = new Navigator03NavigationRequest({
      queryParams: {id: 1, name: 'hello'}
    });
    this.subscription = new Subscription();
  }

  //#endregion

  //#region Methods

  public ngOnInit(): void {

    const setting = new DemoLayoutSetting();
    setting.title = 'SMART_NAVIGATOR_DEMO.SMART_NAVIGATOR_DEMO';
    this.demoLayoutService.changeLayoutSetting(setting);
  }

  public ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  public accessTab01(): void {
    const tab01NavigationSubscription = this.smartNavigatorService
      .navigateToScreenAsync(new NavigateToScreenRequest(ScreenCodes.smartNavigatorTab01Demo))
      .subscribe();

    this.subscription.add(tab01NavigationSubscription);
  }

  public accessTab02(): void {
    const tab02NavigationSubscription = this.smartNavigatorService
      .navigateToScreenAsync(new NavigateToScreenRequest(ScreenCodes.smartNavigatorTab02Demo))
      .subscribe();

    this.subscription.add(tab02NavigationSubscription);
  }

  public loadRawUrl(screenCode: string): string | null {
    return this.smartNavigatorService.loadRawUrl(screenCode);
  }

  //#endregion
}
