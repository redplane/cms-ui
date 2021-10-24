import {NgModule} from '@angular/core';
import {DemoPageComponent} from './demo-page.component';
import {ToTrustedHtmlPipeModule} from '@cms-ui/core';

@NgModule({
  imports: [
    ToTrustedHtmlPipeModule
  ],
  declarations: [
    DemoPageComponent
  ],
  exports: [
    DemoPageComponent
  ]
})
export class DemoPageModule {

}
