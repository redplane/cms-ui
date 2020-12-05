import {NgModule} from '@angular/core';
import {SpinnerDemoComponent} from './spinner-demo.component';
import {SpinnerDemoRoutingModule} from './spinner-demo-routing.module';
import {SpinnerContainerModule} from '@cms-ui/core';
import {WINDOW_PROVIDERS} from '@cms-ui/core';
import {DemoLayoutModule} from '../shared/demo-layout/demo-layout.module';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        SpinnerDemoRoutingModule,

        DemoLayoutModule,
        SpinnerContainerModule.forRoot(),
        CommonModule
    ],
  declarations: [
    SpinnerDemoComponent
  ],
  exports: [
    SpinnerDemoComponent
  ],
  providers: [
    WINDOW_PROVIDERS
  ]
})
export class SpinnerDemoModule {

}
