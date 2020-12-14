import {DialogBuilderExceptionConstant, DialogResult, IDialogBuilder, IDialogSetting} from '@cms-ui/core';
import {Injectable, Injector} from '@angular/core';
import {from, Observable, throwError} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BasicBsDialogComponent} from '../../../modules/shared/dialog/basic-bs-dialog/basic-bs-dialog.component';
import {BasicDialogSetting} from '../../../models/dialogs/basic-dialog-setting';
import {map} from 'rxjs/operators';

@Injectable()
export class BasicBsDialogBuilder implements IDialogBuilder {

  //#region Properties

  // tslint:disable-next-line:variable-name
  protected _bsDialog: NgbModal;

  //#endregion

  //#region Constructor

  public constructor(protected injector: Injector) {
    this._bsDialog = injector.get(NgbModal);
  }

  //#endregion

  //#region Methods

  public buildAsync<T>(settings: IDialogSetting): Observable<DialogResult<T>> {

    if (!settings) {
      return throwError(DialogBuilderExceptionConstant.invalidDialogSettings);
    }

    if (!(settings instanceof BasicDialogSetting)) {
      return throwError('SETTING_MUST_BE_BASIC_DIALOG_SETTING');
    }

    const basicDialogSetting = settings as BasicDialogSetting;

    const dialogRef = this._bsDialog.open(BasicBsDialogComponent, {
      backdrop: settings.disableClose ? 'static' : undefined,
      backdropClass: (settings.backdropClasses && settings.backdropClasses.length)
        ? settings.backdropClasses.join(' ') : undefined,
      injector: this.injector,
      centered: settings.centered
    });

    const instance = dialogRef.componentInstance;
    return from(dialogRef.result)
      .pipe(
        map((dialogResult: DialogResult<T>) => dialogResult)
      );
  }

  //#endregion
}
