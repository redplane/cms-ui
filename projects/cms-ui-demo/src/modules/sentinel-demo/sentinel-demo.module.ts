import {NgModule} from '@angular/core';
import {SentinelDemoComponent} from './sentinel-demo.component';
import {SentinelDemoRoutingModule} from './sentinel-demo-routing.module';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {SmartNavigatorModule} from '@cms-ui/core';

@NgModule({
  imports: [
    SentinelDemoRoutingModule,
    RouterModule,
    TranslateModule,
    SmartNavigatorModule
  ],
  declarations: [
    SentinelDemoComponent
  ]
})
export class SentinelDemoModule {

}
