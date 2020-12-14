import {NgModule} from '@angular/core';
import {BasicBsDialogComponent} from './basic-bs-dialog.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    BasicBsDialogComponent
  ],
  exports: [
    BasicBsDialogComponent
  ],
  imports: [
    NgbModalModule
  ]
})
export class BasicBsDialogModule {

}
