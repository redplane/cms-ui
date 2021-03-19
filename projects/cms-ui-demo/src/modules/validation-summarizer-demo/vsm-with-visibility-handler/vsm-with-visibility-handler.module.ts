import {NgModule} from '@angular/core';
import {VsmWithVisibilityHandlerRoutingModule} from './vsm-with-visibility-handler-routing.module';
import {VsmWithVisibilityHandlerComponent} from './vsm-with-visibility-handler.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidationSummarizerModule} from '@cms-ui/core';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    VsmWithVisibilityHandlerRoutingModule,
    ReactiveFormsModule,
    ValidationSummarizerModule,
    CommonModule
  ],
  declarations: [
    VsmWithVisibilityHandlerComponent
  ]
})
export class VsmWithVisibilityHandlerModule {

}
