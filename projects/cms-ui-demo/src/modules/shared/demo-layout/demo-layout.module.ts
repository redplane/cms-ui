import {ModuleWithProviders, NgModule} from '@angular/core';
import {DemoLayoutComponent} from './demo-layout.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {DemoLayoutSetting} from '../../../models/demo-layout-setting';
import {DEMO_LAYOUT_SERVICE_PROVIDER, DEMO_LAYOUT_SETTINGS} from '../../../constants/injection-token.constant';
import {DemoLayoutService} from '../../../services/implementations/demo-layout.service';
import {TranslateModule} from '@ngx-translate/core';
import {SmartNavigatorModule} from '@cms-ui/core';
import {DemoLayoutItemsDirective} from './demo-layout-items/demo-layout-items.directive';
import {AngularResizedEventModule} from 'angular-resize-event';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule,
    SmartNavigatorModule,
    AngularResizedEventModule
  ],
  declarations: [
    DemoLayoutItemsDirective,
    DemoLayoutComponent
  ],
  exports: [
    DemoLayoutItemsDirective,
    DemoLayoutComponent
  ],
  providers: [
    {
      provide: DEMO_LAYOUT_SERVICE_PROVIDER,
      useClass: DemoLayoutService
    }
  ]
})
export class DemoLayoutModule {

  //#region Methods

  public static forRoot(settings: DemoLayoutSetting): ModuleWithProviders<DemoLayoutModule> {
    return {
      ngModule: DemoLayoutModule,
      providers: [
        {
          provide: DEMO_LAYOUT_SETTINGS,
          useValue: settings
        },
        {
          provide: DEMO_LAYOUT_SERVICE_PROVIDER,
          useClass: DemoLayoutService
        }
      ]
    };
  }

  //#endregion
}
