import { ModuleWithProviders, NgModule } from '@angular/core';
import { MODAL_SERVICE_PROVIDER } from './injection-token.constant';
import { BasicModalService } from './basic-modal.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { BasicDialogComponent } from './basic-dialog/basic-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { SelectModalComponent } from './select-modal/select-modal.component';
import { OffsetTopDirective } from '@app/directives/app-offset-top.directive';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TranslateModule,
    MatIconModule,
    FlexModule,
    MatSelectModule,
    MatListModule,
    FormsModule,
  ],
  declarations: [BasicDialogComponent, SelectModalComponent, OffsetTopDirective],
  exports: [BasicDialogComponent, SelectModalComponent],
  entryComponents: [BasicDialogComponent, SelectModalComponent],
})
export class BasicModalModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: BasicModalModule,
      providers: [
        {
          provide: MODAL_SERVICE_PROVIDER,
          useClass: BasicModalService,
        },
      ],
    };
  }
}
