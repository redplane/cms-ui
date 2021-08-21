import {NgModule} from '@angular/core';
import {RequirePermissionFeatureDirective} from './feature-sentinel.directive';

@NgModule({
  declarations: [
    RequirePermissionFeatureDirective
  ],
  exports: [
    RequirePermissionFeatureDirective
  ]
})
export class FeatureSentinelModule {
}
