import {NgModule} from '@angular/core';
import {FeatureSentinelDemoComponent} from './feature-sentinel-demo.component';
import {FeatureSentinelDemoRoutingModule} from './feature-sentinel-demo-routing.module';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {ExampleDescriptionLayoutModule} from '../../shared/example-description-layout/example-description-layout.module';

@NgModule({
  imports: [
    ExampleDescriptionLayoutModule,
    FeatureSentinelDemoRoutingModule,
    RouterModule,
    TranslateModule
  ],
  declarations: [
    FeatureSentinelDemoComponent
  ],
  exports: [
    FeatureSentinelDemoComponent
  ]
})
export class FeatureSentinelDemoModule {

}
