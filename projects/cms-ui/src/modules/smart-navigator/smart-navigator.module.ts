import {Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SMART_NAVIGATOR_PROVIDER, SMART_NAVIGATOR_ROUTES} from '../../constants/injection-token.constant';
import {SmartNavigatorService} from '../../services/implementations/smart-navigator.service';

const basicNavigatorServiceFactory = (injector: Injector) => {
  return new SmartNavigatorService(injector);
};

@NgModule({
  imports: [
    RouterModule
  ],
  providers: [
    {
      provide: SMART_NAVIGATOR_PROVIDER,
      useFactory: basicNavigatorServiceFactory,
      deps: [
        Injector
      ]
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
