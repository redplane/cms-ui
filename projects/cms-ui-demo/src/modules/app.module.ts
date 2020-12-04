import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavigationBarModule} from './navigation-bar/navigation-bar.module';
import {RouterModule} from '@angular/router';
import {MasterLayoutModule} from './master-layout/master-layout.module';
import {SmartNavigatorModule} from '@cms-ui/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SmartNavigatorModule.forRoot({
      LANDING: '/',
      SPINNER_DEMO: '/spinner-demo',
      BANNER_DEMO: '/banner-demo'
    }),
    MasterLayoutModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
