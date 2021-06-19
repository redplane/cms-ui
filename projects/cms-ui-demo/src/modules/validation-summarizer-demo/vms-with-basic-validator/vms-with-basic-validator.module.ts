import {NgModule} from '@angular/core';
import {VmsWithBasicValidatorRoutingModule} from './vms-with-basic-validator-routing.module';
import {VmsWithBasicValidatorComponent} from './vms-with-basic-validator.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidationSummarizerModule} from '@cms-ui/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import { HighlightJsModule } from 'ngx-highlight-js';
import {ToStaticFileContentModule} from '../../shared/pipe/to-static-file-content.module';

@NgModule({
  imports: [
    VmsWithBasicValidatorRoutingModule,
    ReactiveFormsModule,
    ValidationSummarizerModule,
    CommonModule,
    TranslateModule,
    HighlightJsModule,
    ToStaticFileContentModule,
  ],
  declarations: [
    VmsWithBasicValidatorComponent
  ]
})
export class VmsWithBasicValidatorModule {

}
