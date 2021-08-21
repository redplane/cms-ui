import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {
  EXAMPLE_DEMO_DESCRIPTION_MODULE_NAME_PROVIDER,
  EXAMPLE_DEMO_LAYOUT_SERVICE_PROVIDER
} from '../../../constants/injection-token.constant';
import {IExampleDescriptionLayoutService} from './example-description-layout-service.interface';
import {Subscription} from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'example-description-layout',
  templateUrl: 'example-description-layout.component.html'
})
export class ExampleDescriptionLayoutComponent implements OnInit, OnDestroy {

  //#region Properties

  // Html content.
  // tslint:disable-next-line:variable-name
  private _htmlContent: string;

  // tslint:disable-next-line:variable-name
  private readonly _subscription: Subscription;

  //#endregion

  //#region Accessors

  public get htmlContent(): string {
    return this._htmlContent;
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(EXAMPLE_DEMO_LAYOUT_SERVICE_PROVIDER)
                     protected readonly exampleDemoLayoutService: IExampleDescriptionLayoutService,
                     @Inject(EXAMPLE_DEMO_DESCRIPTION_MODULE_NAME_PROVIDER) protected readonly moduleName: string) {
    this._htmlContent = '';
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycle

  public ngOnInit(): void {

    const loadDescriptionContentSubscription = this.exampleDemoLayoutService.loadHtmlContentAsync(this.moduleName)
      .subscribe(content => this._htmlContent = content);
    this._subscription.add(loadDescriptionContentSubscription);

  }

  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }

  //#endregion
}
