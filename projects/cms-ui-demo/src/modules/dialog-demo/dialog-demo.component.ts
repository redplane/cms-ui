import {Component, Inject, OnDestroy} from '@angular/core';
import {DIALOG_SERVICE_PROVIDER, IDialogService} from '@cms-ui/core';
import {BasicDialogSetting} from '../../models/dialogs/basic-dialog-setting';
import {Subscription} from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-demo',
  templateUrl: 'dialog-demo.component.html',
  styleUrls: ['dialog-demo.component.scss']
})
export class DialogDemoComponent implements OnDestroy {

  //#region Properties

  // tslint:disable-next-line:variable-name
  private readonly _subscription: Subscription;

  //#endregion

  //#region Constructor

  public constructor(@Inject(DIALOG_SERVICE_PROVIDER) protected dialogService: IDialogService) {
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Methods

  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }

  public displayBasicDialog(): void {

    const basicDialogSettings = new BasicDialogSetting();
    basicDialogSettings.title = 'This is title';
    basicDialogSettings.message = 'This is message';

    const displayDialogSubscription = this.dialogService
      .displayDialogAsync(basicDialogSettings)
      .subscribe();

    this._subscription.add(displayDialogSubscription);
  }

  //#endregion
}
