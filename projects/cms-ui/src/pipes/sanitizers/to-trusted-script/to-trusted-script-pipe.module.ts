import {NgModule} from '@angular/core';
import {ToTrustedScriptPipe} from './to-trusted-script.pipe';

@NgModule({
  declarations: [
    ToTrustedScriptPipe
  ],
  exports: [
    ToTrustedScriptPipe
  ]
})
export class ToTrustedScriptPipeModule {
}
