import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SMART_NAVIGATOR_PROVIDER, SMART_NAVIGATOR_ROUTES} from '../../constants/injection-token.constant';
import {SmartNavigatorService} from '../../services/implementations/smart-navigator.service';

@NgModule({
  imports: [
    RouterModule
  ],
  providers: [
    {
      provide: SMART_NAVIGATOR_PROVIDER,
      useClass: SmartNavigatorService
    }
  ]
})
export class SmartNavigatorModule {

  public static forRoot(codeToUrlMappings?: { [key: string]: string }): ModuleWithProviders<SmartNavigatorModule> {
    return {
      ngModule: SmartNavigatorModule,
      providers: [
        {
          provide: SMART_NAVIGATOR_ROUTES,
          useValue: codeToUrlMappings || {}
        }
      ]
    };
  }
}
