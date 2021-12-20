import {ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ValidationSummarizerDemoScreenCodes} from '../../constants/screen-codes/validation-summarizer-demo-screen-codes';
import {UI_MODULE_PAGE_SERVICE} from '../../constants/injectors';
import {INgRxMessageBusService, MESSAGE_BUS_SERVICE_PROVIDER} from 'ngrx-message-bus';
import {UiModulePageService} from '../pages/ui-module-page/ui-module-page.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'validation-summarizer-demo',
  templateUrl: 'validation-summarizer-demo.component.html',
  styleUrls: ['validation-summarizer-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationSummarizerDemoComponent implements OnInit, OnDestroy {

  //#region Properties

  // tslint:disable-next-line:variable-name
  protected _subscription: Subscription;

  public activeClasses = 'list-group-item list-group-item-action list-group-item-primary';

  public inactiveClasses = 'list-group-item list-group-item-action list-group-item-light';

  //#endregion

  //#region Services

  protected readonly demoLayoutService: UiModulePageService;

  protected readonly messageBusService: INgRxMessageBusService;

  //#endregion

  //#region Accessors

  public get validationSummarizerDemoScreenCodes(): typeof ValidationSummarizerDemoScreenCodes {
    return ValidationSummarizerDemoScreenCodes;
  }

  //#endregion

  //#region Constructor

  public constructor(injector: Injector) {

    this.demoLayoutService = injector.get(UI_MODULE_PAGE_SERVICE);
    this.messageBusService = injector.get(MESSAGE_BUS_SERVICE_PROVIDER);
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycles

  public ngOnInit(): void {
    this.demoLayoutService.changeLayoutSetting({
      title: 'Validation Summarizer',
      secondaryTitle: 'Demo'
    });
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  //#endregion

}
