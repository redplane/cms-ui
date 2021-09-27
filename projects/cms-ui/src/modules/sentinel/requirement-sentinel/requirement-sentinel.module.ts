import {Injector, ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {RequirementSentinelDirective} from './requirement-sentinel.directive';
import {RequirementSentinelService} from './requirement-sentinel.service';
import {REQUIREMENT_SENTINEL_SERVICE_PROVIDER} from '../../../constants';

@NgModule({
  declarations: [
    RequirementSentinelDirective
  ],
  exports: [
    RequirementSentinelDirective
  ]
})
export class RequirementSentinelModule {

  //#region Methods

  public static forRoot(): ModuleWithProviders<RequirementSentinelModule> {
    return {
      ngModule: RequirementSentinelModule,
      providers: [
        {
          provide: REQUIREMENT_SENTINEL_SERVICE_PROVIDER,
          useClass: RequirementSentinelService,
          deps: [
            Injector
          ]
        }
      ]
    };
  }

  public static withRequirementHandlers(providers: Provider[]): ModuleWithProviders<RequirementSentinelModule> {
      return {
        ngModule: RequirementSentinelModule,
        providers
      };
  }

  //#endregion
}
