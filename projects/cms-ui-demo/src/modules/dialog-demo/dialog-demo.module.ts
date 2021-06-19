import {NgModule} from '@angular/core';
import {DialogDemoComponent} from './dialog-demo.component';
import {DialogDemoRoutingModule} from './dialog-demo-routing.module';
import {BasicBsDialogModule} from '../shared/dialog/basic-bs-dialog/basic-bs-dialog.module';
import {DIALOG_BUILDER_PROVIDER, DIALOG_SERVICE_PROVIDER, DialogService} from '@cms-ui/core';
import {BasicBsDialogBuilder} from '../../services/implementations/dialogs/basic-bs-dialog.builder';
import {BasicDialogService} from '../../services/implementations/dialogs/basic-dialog.service';
import {BasicBsDialogComponent} from '../shared/dialog/basic-bs-dialog/basic-bs-dialog.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    DialogDemoRoutingModule,
    BasicBsDialogModule,
    TranslateModule,
  ],
  declarations: [
    DialogDemoComponent
  ],
  exports: [
    DialogDemoComponent
  ],
  providers: [
    {
      provide: DIALOG_BUILDER_PROVIDER,
      useClass: BasicBsDialogBuilder,
      multi: true
    },
    {
      provide: DIALOG_SERVICE_PROVIDER,
      useClass: BasicDialogService
    }
  ],
  entryComponents: [
    BasicBsDialogComponent
  ]
})
export class DialogDemoModule {

}
