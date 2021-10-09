import {NgModule} from '@angular/core';
import {SpinnerDemoComponent} from './spinner-demo.component';
import {SpinnerDemoRoutingModule} from './spinner-demo-routing.module';
import {SpinnerContainerModule} from '@cms-ui/core';
import {DemoLayoutModule} from '../shared/demo-layout/demo-layout.module';
import {CommonModule} from '@angular/common';
import {Spinner01Component} from './spinner-01/spinner-01.component';
import {Spinner02Component} from './spinner-02/spinner-02.component';
import {WINDOW_PROVIDERS} from '../../services/implementations/app-window.service';

@NgModule({
  imports: [
    SpinnerDemoRoutingModule,

    DemoLayoutModule,
    SpinnerContainerModule.forRoot(),
    CommonModule
  ],
  declarations: [
    Spinner01Component,
    Spinner02Component,
    SpinnerDemoComponent
  ],
  exports: [
    Spinner01Component,
    Spinner02Component,
    SpinnerDemoComponent
  ],
  entryComponents: [
    Spinner01Component,
    Spinner02Component
  ],
  providers: [
    WINDOW_PROVIDERS
  ]
})
export class SpinnerDemoModule {

}
