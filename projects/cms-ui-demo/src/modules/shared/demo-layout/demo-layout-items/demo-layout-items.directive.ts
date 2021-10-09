import {AfterViewInit, Directive, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {DemoLayoutComponent} from '../demo-layout.component';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[demo-layout-items]'
})
export class DemoLayoutItemsDirective implements OnInit, AfterViewInit, OnDestroy {

  //#region Properties

  private readonly _subscription: Subscription;

  //#endregion

  //#region Constructor

  public constructor(public readonly templateRef: TemplateRef<any>,
                     public readonly demoLayoutComponent: DemoLayoutComponent) {
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycle hooks

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    const hookLayoutReadinessSubscription = this.demoLayoutComponent
      .readyEvent
      .subscribe(() => {
        this.demoLayoutComponent.buildSideBar(this.templateRef);
      });
    this._subscription.add(hookLayoutReadinessSubscription);
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  //#endregion
}
