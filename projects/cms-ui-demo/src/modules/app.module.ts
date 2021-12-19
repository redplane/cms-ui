import {BrowserModule} from '@angular/platform-browser';
import {Compiler, COMPILER_OPTIONS, CompilerFactory, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MasterLayoutModule} from './master-layout/master-layout.module';
import {SMART_NAVIGATOR_SCREEN_CODE_RESOLVER, SmartNavigatorModule} from '@cms-ui/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {
  SmartNavigatorDemoScreenCodeResolver
} from '../services/implementations/screen-code-resolvers/smart-navigator-demo.screen-code-resolver';
import {
  ValidationSummarizerDemoScr
} from '../services/implementations/screen-code-resolvers/validation-summarizer-demo.scr';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpLoaderFactory} from '../factories/translate.factory';
import {AlertBannerContentModule} from './shared/alert-banner-content/alert-banner-content.module';
import {InfoBannerContentModule} from './shared/info-banner-content/info-banner-content.module';
import {NgRxMessageBusModule} from 'ngrx-message-bus';
import {ApplicationScr} from '../services/implementations/application.scr';
import {ApiModule} from './services/api.module';

import { JitCompilerFactory } from '@angular/platform-browser-dynamic';

export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SmartNavigatorModule.forRoot({
      LANDING: '/',
      SPINNER_DEMO: '/spinner-demo',
      BANNER_DEMO: '/banner-demo',
      VALIDATION_SUMMARIZER_DEMO: '/validation-summarizer-demo',
      DIALOG_DEMO: '/dialog-demo'
    }),
    MasterLayoutModule,
    AppRoutingModule,
    ApiModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AlertBannerContentModule,
    InfoBannerContentModule,
    NgRxMessageBusModule.forRoot()
  ],
  providers: [
    { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
    { provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS] },
    { provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory] },
    {
      provide: SMART_NAVIGATOR_SCREEN_CODE_RESOLVER,
      useClass: ApplicationScr,
      multi: true
    },
    {
      provide: SMART_NAVIGATOR_SCREEN_CODE_RESOLVER,
      useClass: SmartNavigatorDemoScreenCodeResolver,
      multi: true
    },
    {
      provide: SMART_NAVIGATOR_SCREEN_CODE_RESOLVER,
      useClass: ValidationSummarizerDemoScr,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
