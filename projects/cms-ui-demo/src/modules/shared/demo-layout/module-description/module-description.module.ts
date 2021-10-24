import {NgModule} from '@angular/core';
import {ModuleDescriptionComponent} from './module-description.component';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {ModuleDescriptionRoutingModule} from './module-description-routing.module';
import {ToTrustedHtmlPipeModule} from '@cms-ui/core';

@NgModule({
  declarations: [
    ModuleDescriptionComponent
  ],
  imports: [
    ToTrustedHtmlPipeModule,
    ModuleDescriptionRoutingModule,
    TranslateModule,
    CommonModule
  ],
  exports: [
    ModuleDescriptionComponent
  ]
})
export class ModuleDescriptionModule {
}
