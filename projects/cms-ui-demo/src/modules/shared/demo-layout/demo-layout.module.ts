import {ModuleWithProviders, NgModule} from '@angular/core';
import {DemoLayoutComponent} from './demo-layout.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {DemoLayoutSetting} from '../../../models/demo-layout-setting';
import {UI_MODULE_PAGE_SERVICE, DEMO_LAYOUT_SETTINGS} from '../../../constants/injectors';
import {UiModulePageService} from '../../pages/ui-module-page/ui-module-page.service';
import {TranslateModule} from '@ngx-translate/core';
import {SmartNavigatorModule} from '@cms-ui/core';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule,
    SmartNavigatorModule
  ],
  declarations: [
    DemoLayoutComponent
  ],
  exports: [
    DemoLayoutComponent
  ],
  providers: [
    {
      provide: UI_MODULE_PAGE_SERVICE,
      useClass: UiModulePageService
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
          provide: UI_MODULE_PAGE_SERVICE,
          useClass: UiModulePageService
        }
      ]
    };
  }

  //#endregion
}
