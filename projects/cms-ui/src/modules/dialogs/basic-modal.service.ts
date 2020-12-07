import {IModalService} from './modal-service.interface';
import {Injectable, TemplateRef} from '@angular/core';
import {Observable, of, race} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {delay, map, mergeMap, tap} from 'rxjs/operators';
import {DialogResult} from '../../models/implementations/dialogs/dialog-result';
import {ModalActionConstant} from './modal-action.constant';
import {BasicDialogComponent} from './basic-dialog/basic-dialog.component';
import {IConfirmModalSettings} from '../../models/interfaces/dialogs/basic-dialog-setting.interface';
import {ISelectModalSettings} from './select-modal/select-modal-settings.interface';
import {SelectModalComponent} from './select-modal/select-modal.component';
import {ModalTimeoutAction} from './models/modal-timeout-action';

@Injectable()
export class BasicModalService implements IModalService {

  //#region Constructor

  public constructor(public dialogService: MatDialog) {
  }

  //#endregion

  //#region Methods

  // Display confirm modal asynchronously
  // Will be return true or false base on action of user in the modal
  public displayConfirmModalAsync<T>(settings: IConfirmModalSettings): Observable<T> {

    // Width setting.
    if (!settings.minWidth && !settings.maxWidth && !settings.width) {
      settings.width = '300px';
    }

    // Height setting.
    if (!settings.minHeight && !settings.maxHeight && !settings.height) {
      settings.height = 'auto';
    }

    const dialogRef = this.dialogService
        .open(BasicDialogComponent, {
          minWidth: settings.minWidth,
          maxWidth: settings.maxWidth,
          width: settings.width,
          minHeight: settings.minHeight,
          maxHeight: settings.maxHeight,
          height: settings.height,
          autoFocus: false,
          disableClose: settings.disableClose,
          panelClass: settings.dialogClass || 'basic-dialog',
          // backdropClass: settings.backdropClass || 'basic-dialog-backdrop'
        });

    // Get the instance which attached into modal.
    const componentInstance = dialogRef.componentInstance;
    componentInstance.title = settings.title;
    componentInstance.message = settings.message;

    // Modal icon update.
    if (typeof (settings.icon) === 'string') {
      componentInstance.icon = settings.icon as string;
    } else if (settings.icon instanceof TemplateRef) {
      componentInstance.iconTemplateRef = settings.icon as TemplateRef<any>;
    }

    // Update action content reference.
    componentInstance.buttons = settings.buttons;

    // Observables to be completed.
    const observables: Observable<any>[] = [];
    const timeoutObservable = this.buildTimeoutObservable(settings.timeout);
    if (timeoutObservable) {
      const afterDialogOpenedObservable = dialogRef.afterOpened()
          .pipe(
              mergeMap(_ => timeoutObservable),
              tap(val => dialogRef.close(val))
          );
      observables.push(afterDialogOpenedObservable);
    }

    // Display basic modal.
    const displayModalObservable = dialogRef
        .afterClosed()
        .pipe(
            map((modalResult: DialogResult<T>) => {

              console.log(modalResult);
              // Modal is dismissed.
              if (ModalActionConstant.dismissed === modalResult.action) {
                throw new Error(ModalActionConstant.dismissed);
              }

              return modalResult.data;
            })
        );

    observables.push(displayModalObservable);
    return race(observables);
  }

  public displaySelectModalAsync<T>(settings: ISelectModalSettings): Observable<T> {
    if (!settings.minWidth && !settings.maxWidth && !settings.width) {
      settings.width = '300px';
    }

    if (!settings.minHeight && !settings.maxHeight && !settings.height) {
      settings.height = 'auto';
    }

    const dialogRef = this.dialogService
        .open(SelectModalComponent, {
          minWidth: settings.minWidth,
          maxWidth: settings.maxWidth,
          width: settings.width,
          minHeight: settings.minHeight,
          maxHeight: settings.maxHeight,
          height: settings.height,
          data: settings.datas,
          disableClose: settings.disableClose
        });

    // Get the instance which attached into modal.
    const componentInstance = dialogRef.componentInstance;

    // Modal title update.
    if (typeof (settings.title) === 'string') {
      componentInstance.title = settings.title as string;
    } else if (settings instanceof TemplateRef) {
      componentInstance.titleTemplateRef = settings.title as TemplateRef<any>;
    }

    // Modal title update.
    if (typeof (settings.icon) === 'string') {
      componentInstance.icon = settings.icon as string;
    } else if (settings.icon instanceof TemplateRef) {
      componentInstance.iconTemplateRef = settings.icon as TemplateRef<any>;
    }

    // Update action content reference.
    componentInstance.buttons = settings.buttons;
    componentInstance.multiple = settings.multiple;
    componentInstance.selectedData = settings.value;

    return dialogRef
        .afterClosed()
        .pipe(
            map((modalResult: DialogResult<T>) => {
              if (modalResult) {
                // Modal is dismissed.
                if (ModalActionConstant.dismissed === modalResult.action) {
                  throw new Error(ModalActionConstant.dismissed);
                }

                return modalResult.data;
              }
            })
        );
  }

  // Build timeout observable
  protected buildTimeoutObservable(modalTimeoutAction: ModalTimeoutAction): Observable<any> {

    // Invalid timeout action settings.
    if (!modalTimeoutAction || !modalTimeoutAction.milliseconds || !modalTimeoutAction.action) {
      return null;
    }

    const actionResult = modalTimeoutAction.action();
    if (typeof actionResult === 'boolean' || actionResult instanceof DialogResult) {
      return of(null)
          .pipe(
              delay(modalTimeoutAction.milliseconds),
              mergeMap(_ => of(actionResult))
          );
    }

    if (actionResult instanceof Observable) {
      return of(null)
          .pipe(
              delay(modalTimeoutAction.milliseconds),
              mergeMap(_ => actionResult)
          );
    }

    return null;
  }

  // Close all dialog which has been dislayed.
  public closeAll(): void {
    this.dialogService.closeAll();
  }

  //#endregion
}
