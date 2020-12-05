import {Component, HostBinding, Inject, OnInit} from '@angular/core';
import {ISpinnerService, SPINNER_SERVICE_PROVIDER, WINDOW} from '@cms-ui/core';
import {v4 as uuid} from 'uuid';
import {DEMO_LAYOUT_SERVICE_PROVIDER} from '../../constants/injection-token.constant';
import {IDemoLayoutService} from '../../services/interfaces/demo-layout-service.interface';
import {cloneDeep} from 'lodash-es';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'spinner-demo',
  templateUrl: 'spinner-demo.component.html',
  styleUrls: ['spinner-demo.component.scss']
})
export class SpinnerDemoComponent implements OnInit {

  //#region Properties

  // How many second the operation must be timed out.
  public readonly timeOutInSecond = 10;

  // Component id.
  public readonly spinnerOnComponentId = uuid();

  // Stackable spinner id.
  public readonly stackableSpinnerId = uuid();

  // tslint:disable-next-line:variable-name
  private _stackableSpinnerRequestIds: string[] = [];

  // Delete spinner on component task.
  // tslint:disable-next-line:variable-name
  private _deleteSpinnerOnComponentTimer: number;

  //#endregion

  //#region Accessors

  public get stackableSpinnerRequestIds(): string[] {
    return this._stackableSpinnerRequestIds;
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(SPINNER_SERVICE_PROVIDER) protected spinnerService: ISpinnerService,
                     @Inject(DEMO_LAYOUT_SERVICE_PROVIDER) protected demoLayoutService: IDemoLayoutService,
                     @Inject(WINDOW) protected windowService: Window) {
    this._deleteSpinnerOnComponentTimer = 0;
  }

  //#endregion

  //#region Life cycle

  public ngOnInit(): void {
    this.demoLayoutService.setTitle('Spinner');
    this.demoLayoutService.setSecondaryTitle('Demo');
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
      this.spinnerService.deleteSpinner(this.spinnerOnComponentId, displaySpinnerRequestId);
    }, this.timeOutInSecond * 1000);
  }

  public displayStackableSpinner(): void {

    const requestIds: string[] = [];
    for (let index = 0; index < 3; index++) {
      const requestId = this.spinnerService.displaySpinner(this.stackableSpinnerId);
      requestIds.push(requestId);
    }

    this._stackableSpinnerRequestIds = requestIds;
  }

  public deleteStackableRequestId(requestId: string): void {
    if (!this._stackableSpinnerRequestIds || !this._stackableSpinnerRequestIds.length) {
      return;
    }

    const index = this._stackableSpinnerRequestIds.indexOf(requestId);
    if (index < 0) {
      return;
    }

    const stackableSpinnerRequestIds = cloneDeep(this._stackableSpinnerRequestIds);
    this.spinnerService.deleteSpinner(this.stackableSpinnerId, requestId);
    stackableSpinnerRequestIds.splice(index, 1);
    this._stackableSpinnerRequestIds = stackableSpinnerRequestIds;
  }

  public deleteStackableRequestIds(): void {
    this._stackableSpinnerRequestIds = [];
    this.spinnerService.deleteSpinners(this.stackableSpinnerId);
  }

  //#endregion
}
