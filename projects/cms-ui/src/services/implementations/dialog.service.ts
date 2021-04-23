import {IDialogService} from '../interfaces/dialogs/dialog-service.interface';
import {Observable, of, race, throwError} from 'rxjs';
import {map, mergeMap, retryWhen, tap} from 'rxjs/operators';
import {DialogResult} from '../../models/implementations/dialogs/dialog-result';
import {DialogResultConstant} from '../../constants/dialog-result.constant';
import {IDialogSettings} from '../../models/interfaces/dialogs/dialog-settings.interface';
import {Injector} from '@angular/core';
import {IDialogBuilder} from '../interfaces/dialogs/dialog-builder.interface';
import {DIALOG_BUILDER_PROVIDER} from '../../constants';

export abstract class DialogService implements IDialogService {

  //#region Properties

  // List of dialog builders to build dialog in the system.
  protected readonly dialogBuilders: IDialogBuilder[];

  //#endregion


  //#region Constructor

  protected constructor(protected injector: Injector) {
    this.dialogBuilders = injector.get(DIALOG_BUILDER_PROVIDER) as any as IDialogBuilder[];
  }

  //#endregion

  //#region Methods

  // Display confirm modal asynchronously
  // Will be return true or false base on action of user in the modal
  public displayDialogAsync<T>(settings: IDialogSettings): Observable<T> {

    return this.buildDialogAsync<T>(settings)
      .pipe(
        map((dialogResult: DialogResult<T>) => {
          // Modal is dismissed.
          if (DialogResultConstant.dismissed === dialogResult.action) {
            throw new Error(DialogResultConstant.dismissed);
          }

          return dialogResult.data;
        })
      );
  }

  // Close all dialog which has been displayed.
  public closeAll(): void {
    throw new Error('Not implemented');
  }

  //#endregion

  //#region Internal methods

  protected buildDialogAsync<T>(settings: IDialogSettings): Observable<DialogResult<T>> {

    if (!settings) {
      return throwError('INVALID_DIALOG_SETTING');
    }

    let itemIndex = 0;
    const builders = this.dialogBuilders;
    const isNotAbleToBuildException = 'IS_NOT_ABLE_TO_BE_BUILT';
    const noBuilderAvailableException = 'NO_DIALOG_BUILDER_AVAILABLE';
    const maxRetriesExceeded = 'MAX_RETRIES_EXCEEDED';

    return of(void (0))
      .pipe(
        tap(_ => {
          if (!builders) {
            throw noBuilderAvailableException;
          }

          if (itemIndex > builders.length - 1) {
            throw maxRetriesExceeded;
          }
        }),
        mergeMap(_ => {

          return builders[itemIndex]
            .buildAsync(settings)
            .pipe(
              map(dialogResult => dialogResult as DialogResult<T>)
            );
        }),
        retryWhen(exceptionObservable => {
          return exceptionObservable
            .pipe(
              tap(exception => {
                if (exception !== isNotAbleToBuildException) {
                  throw exception;
                }

                itemIndex++;
              })
            );
        })
      );

  }

  //#endregion
}
