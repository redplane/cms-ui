import {Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SMART_NAVIGATOR_PROVIDER, SMART_NAVIGATOR_ROUTES} from '../../constants/injectors/injectors';
import {SmartNavigatorService} from '../../services/implementations/smart-navigator.service';
import {ISmartNavigatorService} from '../../services/interfaces/smart-navigator-service.interface';
import {ToRawUrlPipe} from '../../pipes/smart-navigators/to-raw-url.pipe';
import {ToUrlTreePipe} from '../../pipes/smart-navigators/to-url-tree.pipe';
import {ToUrlPipe} from '../../pipes/smart-navigators/to-url.pipe';

export function basicNavigatorServiceFactory(injector: Injector): ISmartNavigatorService {
  return new SmartNavigatorService(injector);
}

@NgModule({
  imports: [
    RouterModule
  ],
  declarations: [
    ToRawUrlPipe,
    ToUrlTreePipe,
    ToUrlPipe
  ],
  exports: [
    ToRawUrlPipe,
    ToUrlTreePipe,
    ToUrlPipe
  ]
})
export class SmartNavigatorModule {

  public static forRoot(codeToUrlMappings?: { [key: string]: string }): ModuleWithProviders<SmartNavigatorModule> {
    return {
      ngModule: SmartNavigatorModule,
      providers: [
        {
          provide: SMART_NAVIGATOR_PROVIDER,
          useFactory: basicNavigatorServiceFactory,
          deps: [
            Injector
          ]
        },
        {
          provide: SMART_NAVIGATOR_ROUTES,
          useValue: codeToUrlMappings || {}
        }
      ]
    };
  }
}
