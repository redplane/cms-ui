import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ValidationSummarizerDemoScreenCodeConstant} from '../../constants/screen-codes/validation-summarizer-demo-screen-code.constant';
import {IDemoLayoutService} from '../../services/interfaces/demo-layout-service.interface';
import {DEMO_LAYOUT_SERVICE_PROVIDER} from '../../constants/injection-token.constant';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'validation-summarizer-demo',
  templateUrl: 'validation-summarizer-demo.component.html',
  styleUrls: ['validation-summarizer-demo.component.scss']
})
export class ValidationSummarizerDemoComponent implements OnInit, OnDestroy {

  //#region Properties

  // tslint:disable-next-line:variable-name
  protected _subscription: Subscription;

  //#endregion

  //#region Services

  protected readonly demoLayoutService: IDemoLayoutService;

  //#endregion

  //#region Accessors

  public get validationSummarizerDemoScreenCodes(): typeof ValidationSummarizerDemoScreenCodeConstant {
    return ValidationSummarizerDemoScreenCodeConstant;
  }

  //#endregion

  //#region Constructor

  public constructor(injector: Injector) {

    this.demoLayoutService = injector.get(DEMO_LAYOUT_SERVICE_PROVIDER);

    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycles

  public ngOnInit(): void {
    this.demoLayoutService.setTitle('Validation Summarizer');
    this.demoLayoutService.setSecondaryTitle('Demo');
  }

  public ngOnDestroy(): void {

    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }

  //#endregion

}
