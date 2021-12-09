import {ModuleWithProviders, NgModule} from '@angular/core';
import {FeatureSentinelDirective} from './feature-sentinel.directive';
import {FeatureSentinelOption} from './feature-sentinel-option';

@NgModule({
  declarations: [
    FeatureSentinelDirective
  ],
  exports: [
    FeatureSentinelDirective
  ]
})
export class FeatureSentinelModule {

  //#region Properties

  public static forRoot(option: FeatureSentinelOption): ModuleWithProviders<FeatureSentinelModule> {
    return {
      ngModule: FeatureSentinelModule,
      providers: option.providers || []
    };
  }

  //#endregion

}
