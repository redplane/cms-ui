import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DEMO_LAYOUT_SERVICE_PROVIDER} from '../../../constants/injection-token.constant';
import {IDemoLayoutService} from '../../../services/interfaces/demo-layout-service.interface';
import {DemoLayoutSetting} from '../../../models/demo-layout-setting';
import {SideBarMenuItem} from '../../../models/side-bar-menu-item';
import {ISmartNavigatorService, SMART_NAVIGATOR_PROVIDER} from '@cms-ui/core';
import {ScreenCodes} from '../../../constants/screen.codes';
import {SideBarSetting} from '../../../side-bar-setting';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'feature-sentinel-demo',
  templateUrl: 'feature-sentinel-demo.component.html'
})
export class FeatureSentinelDemoComponent implements OnInit, OnDestroy {

  //#region Properties

  //#endregion

  //#region Constructor

  public constructor(@Inject(DEMO_LAYOUT_SERVICE_PROVIDER)
                     protected readonly demoLayoutService: IDemoLayoutService,
                     @Inject(SMART_NAVIGATOR_PROVIDER) protected readonly smartNavigatorService: ISmartNavigatorService) {
  }

  //#endregion

  //#region Life cycle

  public ngOnInit(): void {

    const setting = new DemoLayoutSetting();
    setting.title = 'FEATURE_SENTINEL_DEMO.FEATURE_SENTINEL';
    this.demoLayoutService.changeLayoutSetting(setting);

    // Update side bar items.

    const descriptionItem = new SideBarMenuItem('DEMO_LAYOUT.DESCRIPTION',
      this.smartNavigatorService.buildUrlTree(ScreenCodes.featureSentinelDemo));
    const inputAndEventItem = new SideBarMenuItem('DEMO_LAYOUT.INPUTS_N_EVENTS',
      this.smartNavigatorService.buildUrlTree(ScreenCodes.featureSentinelDemo));
    const exampleItem = new SideBarMenuItem('DEMO_LAYOUT.EXAMPLES',
      this.smartNavigatorService.buildUrlTree(ScreenCodes.featureSentinelDemo));
    const sideBarItems = [descriptionItem, inputAndEventItem, exampleItem];
    const sideBarSetting = new SideBarSetting();
    sideBarSetting.items = sideBarItems;
    this.demoLayoutService.changeSideBarSetting(sideBarSetting);
  }

  public ngOnDestroy(): void {
  }

  //#endregion
}
