import {NgModule} from '@angular/core';
import {ToTrustedHtmlPipe} from './to-trusted-html.pipe';

@NgModule({
  declarations: [
    ToTrustedHtmlPipe
  ],
  exports: [
    ToTrustedHtmlPipe
  ]
})
export class ToTrustedHtmlPipeModule {
}
