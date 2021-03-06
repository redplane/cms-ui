import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MasterLayoutModule} from './master-layout/master-layout.module';
import {SMART_NAVIGATOR_SCREEN_CODE_RESOLVER, SmartNavigatorModule} from '@cms-ui/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SmartNavigatorDemoScreenCodeResolver} from '../services/implementations/screen-code-resolvers/smart-navigator-demo.screen-code-resolver';
import {ValidationSummarizerDemoScreenCodeResolver} from '../services/implementations/screen-code-resolvers/validation-summarizer-demo.screen-code-resolver';

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
      DIALOG_DEMO: '/dialog-demo'
    }),
    MasterLayoutModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    {
      provide: SMART_NAVIGATOR_SCREEN_CODE_RESOLVER,
      useClass: SmartNavigatorDemoScreenCodeResolver,
      multi: true
    },
    {
      provide: SMART_NAVIGATOR_SCREEN_CODE_RESOLVER,
      useClass: ValidationSummarizerDemoScreenCodeResolver,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
