import {NgModule} from '@angular/core';
import {ToTrustedResourceUrlPipe} from './to-trusted-resource-url.pipe';

@NgModule({
  declarations: [
    ToTrustedResourceUrlPipe
  ],
  exports: [
    ToTrustedResourceUrlPipe
  ]
})
export class ToTrustedResourceUrlPipeModule {

}
