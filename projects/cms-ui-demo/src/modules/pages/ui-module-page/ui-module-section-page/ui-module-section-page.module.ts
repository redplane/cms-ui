import {NgModule} from '@angular/core';
import {UiModuleSectionPageComponent} from './ui-module-section-page.component';
import {ToTrustedHtmlPipeModule} from '@cms-ui/core';

@NgModule({
  imports: [
    ToTrustedHtmlPipeModule
  ],
  declarations: [
    UiModuleSectionPageComponent
  ],
  exports: [
    UiModuleSectionPageComponent
  ]
})
export class UiModuleSectionPageModule {

}
