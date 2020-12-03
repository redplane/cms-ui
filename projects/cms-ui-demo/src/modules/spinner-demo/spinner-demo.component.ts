import {Component, HostBinding, Inject} from '@angular/core';
import {ISpinnerService, SPINNER_SERVICE_PROVIDER, WINDOW_PROVIDER} from '@cms-ui/core';
import {v4 as uuid} from 'uuid';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'spinner-demo',
  templateUrl: 'spinner-demo.component.html',
  styleUrls: ['spinner-demo.component.scss']
})
export class SpinnerDemoComponent {

  //#region Properties

  public readonly spinnerOnComponentId = uuid();

  // Delete spinner on component task.
  // tslint:disable-next-line:variable-name
  private _deleteSpinnerOnComponentTimer: number;

  //#endregion

  //#region Constructor

  public constructor(@Inject(SPINNER_SERVICE_PROVIDER) protected spinnerService: ISpinnerService,
                     @Inject(WINDOW_PROVIDER) protected windowService: Window) {
    this._deleteSpinnerOnComponentTimer = 0;
  }

  //#endregion

  //#region Methods

  public displaySpinnerOnComponent(): void {
    this.spinnerService.displaySpinner(this.spinnerOnComponentId);
    if (this._deleteSpinnerOnComponentTimer) {

    }
  }

  //#endregion
}
