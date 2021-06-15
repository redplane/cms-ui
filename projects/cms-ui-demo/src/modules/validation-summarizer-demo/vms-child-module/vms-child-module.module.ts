import {NgModule} from '@angular/core';
import {VmsChildModuleRoutingModule} from './vms-child-module-routing.module';
import {CommonModule} from '@angular/common';
import {VmsChildModuleComponent} from './vms-child-module.component';
import {ValidationSummarizerModule} from '@cms-ui/core';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {TranslatedValidationSummarizerService} from '../../../services/implementations/translated-validation-summarizer.service';

@NgModule({
  imports: [
    CommonModule,
    ValidationSummarizerModule.forChild({
      validationService: TranslatedValidationSummarizerService,
      useBuiltInValidationMessage: true,
      validationMessages: {
        notGreaterThan: 'MSG_VALUE_NOT_GREATER_THAN'
      }
    }),

    VmsChildModuleRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    VmsChildModuleComponent
  ]
})
export class VmsChildModuleModule {

}
