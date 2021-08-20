import {NgModule} from '@angular/core';
import {RequirePermissionFeatureDirective} from './require-feature-permission.directive';

@NgModule({
  declarations: [
    RequirePermissionFeatureDirective
  ],
  exports: [
    RequirePermissionFeatureDirective
  ]
})
export class RequireFeaturePermissionModule {
}
