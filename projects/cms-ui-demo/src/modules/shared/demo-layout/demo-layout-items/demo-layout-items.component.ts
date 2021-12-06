import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DEMO_MODULE_SERVICE} from '../../../../constants/injectors';
import {UiModule} from '../../../../models/ui-module';
import {IDemoModuleService} from '../../../../services/interfaces/demo-module-service.interface';
import {ISpinnerService, SPINNER_SERVICE_PROVIDER} from '@cms-ui/core';
import {DemoModuleViewModel} from '../../../../view-models/demo-module.view-model';

@Component({
  selector: 'vsm-demo-items',
  templateUrl: './demo-layout-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoLayoutItemsComponent implements OnInit, OnDestroy {

  //#region Properties

  // Demo layout items.
  private _items: UiModule[];

  private readonly _subscription: Subscription;

  //#endregion

  //#region Accessors

  public get items(): DemoModuleViewModel[] {
    return this._items;
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(DEMO_MODULE_SERVICE) protected readonly demoModuleService: IDemoModuleService,
                     protected readonly changeDetectorRef: ChangeDetectorRef) {
    this._items = [];
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycle hooks

  public ngOnInit(): void {

    const loadDemoModulesSubscription = this.demoModuleService
      .loadDemoModulesAsync()
      .subscribe(demoModules => {
        this._items = demoModules;
        this.changeDetectorRef.markForCheck();
      });
    this._subscription.add(loadDemoModulesSubscription);

  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  //#endregion

  //#region Methods

  //#endregion

}
