import {Injector, ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {RequirementSentinelDirective} from './requirement-sentinel.directive';
import {REQUIREMENT_SENTINEL_SERVICE} from '../../../constants/injectors/injectors';
import {buildSentinelDirectiveService} from '../../../factories/requirement-sentinel.factory';

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
          provide: REQUIREMENT_SENTINEL_SERVICE,
          useFactory: buildSentinelDirectiveService,
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
