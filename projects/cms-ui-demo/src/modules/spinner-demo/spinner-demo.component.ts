import {Component, HostBinding, Inject} from '@angular/core';
import {ISpinnerService, SPINNER_SERVICE_PROVIDER, WINDOW} from '@cms-ui/core';
import {v4 as uuid} from 'uuid';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'spinner-demo',
  templateUrl: 'spinner-demo.component.html',
  styleUrls: ['spinner-demo.component.scss']
})
export class SpinnerDemoComponent {

  //#region Properties

  // How many second the operation must be timed out.
  public readonly timeOutInSecond = 10;

  // Component id.
  public readonly spinnerOnComponentId = uuid();

  // Delete spinner on component task.
  // tslint:disable-next-line:variable-name
  private _deleteSpinnerOnComponentTimer: number;

  //#endregion

  //#region Constructor

  public constructor(@Inject(SPINNER_SERVICE_PROVIDER) protected spinnerService: ISpinnerService,
                     @Inject(WINDOW) protected windowService: Window) {
    this._deleteSpinnerOnComponentTimer = 0;
  }

  //#endregion

  //#region Methods

  public displaySpinnerOnComponent(): void {

    const displaySpinnerRequestId = this.spinnerService.displaySpinner(this.spinnerOnComponentId);
    if (this._deleteSpinnerOnComponentTimer) {
      this.windowService.clearTimeout(this._deleteSpinnerOnComponentTimer);
      this._deleteSpinnerOnComponentTimer = 0;
    }

    this._deleteSpinnerOnComponentTimer = this.windowService.setTimeout(() => {
      this.spinnerService.deleteSpinner(this.spinnerOnComponentId);
    }, this.timeOutInSecond * 1000);
  }

  //#endregion
}
