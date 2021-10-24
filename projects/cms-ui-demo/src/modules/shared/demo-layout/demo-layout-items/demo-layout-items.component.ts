import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, Optional} from '@angular/core';
import {DemoLayoutItem} from './demo-layout-item';
import {Subscription} from 'rxjs';
import {DEMO_LAYOUT_ITEMS_BUILDER_PROVIDER} from '../../../../constants/injectors';
import {BaseDemoLayoutItemsBuilder} from './base-demo-layout-items.builder';

@Component({
  selector: 'vsm-demo-items',
  templateUrl: './demo-layout-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoLayoutItemsComponent implements OnInit, OnDestroy {

  //#region Properties

  // Demo layout items.
  private _items: DemoLayoutItem[];

  private readonly _subscription: Subscription;

  //#endregion

  //#region Accessors

  public get items(): DemoLayoutItem[] {
    return this._items;
  }

  //#endregion

  //#region Constructor

  public constructor(@Optional() @Inject(DEMO_LAYOUT_ITEMS_BUILDER_PROVIDER)
                     protected readonly demoLayoutItemsBuilder: BaseDemoLayoutItemsBuilder) {
    this._items = [];
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycle hooks

  public ngOnInit(): void {

    if (this.demoLayoutItemsBuilder) {
      const hookDemoItemBuildSubscription = this.demoLayoutItemsBuilder
        .loadAvailableDemoItemsAsync()
        .subscribe(items => {
          this._items = items;
        });
      this._subscription.add(hookDemoItemBuildSubscription);
    }
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  //#endregion

  //#region Methods

  //#endregion

}
