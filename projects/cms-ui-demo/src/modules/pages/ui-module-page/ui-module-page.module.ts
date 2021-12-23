import {NgModule} from '@angular/core';
import {UiModulePageComponent} from './ui-module-page.component';
import {UiModulePageRoutingModule} from './ui-module-page-routing.module';
import {UI_MODULE_PAGE_SERVICE} from '../../../constants/injectors';
import {UiModulePageService} from './ui-module-page.service';
import {TranslateModule} from '@ngx-translate/core';
import {UiModulePageGuard} from '../../../guards/ui-module-page.guard';
import {CommonModule} from '@angular/common';
import {SmartNavigatorModule} from '@cms-ui/core';

@NgModule({
  imports: [
    UiModulePageRoutingModule,
    TranslateModule,
    CommonModule,
    SmartNavigatorModule
  ],
  declarations: [
    UiModulePageComponent
  ],
  exports: [
    UiModulePageComponent
  ],
  providers: [
    UiModulePageGuard,
    {
      provide: UI_MODULE_PAGE_SERVICE,
      useClass: UiModulePageService
    }
  ]
})
export class UiModulePageModule {

}
