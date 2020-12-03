import {NgModule} from '@angular/core';
import {SpinnerDemoComponent} from './spinner-demo.component';
import {SpinnerDemoRoutingModule} from './spinner-demo-routing.module';
import {SpinnerContainerModule} from '@cms-ui/core';

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
  ]
})
export class SpinnerDemoModule {

}
