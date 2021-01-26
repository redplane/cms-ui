import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MasterLayoutModule} from './master-layout/master-layout.module';
import {SmartNavigatorModule} from '@cms-ui/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SmartNavigatorModule.forRoot({
      LANDING: '/',
      SPINNER_DEMO: '/spinner-demo',
      BANNER_DEMO: '/banner-demo',
      VALIDATION_SUMMARIZER_DEMO: '/validation-summarizer-demo',
      DIALOG_DEMO: '/dialog-demo',
      SMART_NAVIGATOR_DEMO: '/smart-navigator-demo',
      SMART_NAVIGATOR_TAB_01_DEMO: '/smart-navigator-demo/tab-01',
      SMART_NAVIGATOR_TAB_02_DEMO: '/smart-navigator-demo/tab-02'
    }),
    MasterLayoutModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
