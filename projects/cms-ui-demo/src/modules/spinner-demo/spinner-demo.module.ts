import {NgModule} from '@angular/core';
import {SpinnerDemoComponent} from './spinner-demo.component';
import {SpinnerDemoRoutingModule} from './spinner-demo-routing.module';
import {SpinnerContainerModule} from '@cms-ui/core';
import {WINDOW_PROVIDERS} from '@cms-ui/core';

@NgModule({
  imports: [
    SpinnerDemoRoutingModule,
    SpinnerContainerModule.forRoot()
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
