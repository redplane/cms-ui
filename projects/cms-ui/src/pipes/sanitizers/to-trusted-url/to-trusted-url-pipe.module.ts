import {NgModule} from '@angular/core';
import {ToTrustedUrlPipe} from './to-trusted-url.pipe';

@NgModule({
  declarations: [
    ToTrustedUrlPipe
  ],
  exports: [
    ToTrustedUrlPipe
  ]
})
export class ToTrustedUrlPipeModule {

}
