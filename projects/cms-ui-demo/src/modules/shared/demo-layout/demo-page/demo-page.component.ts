import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DEMO_PAGE_SERVICE_PROVIDER} from '../../../../constants/injectors';
import {IDemoPageService} from './demo-page-service.interface';

@Component({
  selector: 'demo-page',
  templateUrl: './demo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoPageComponent implements OnInit, OnDestroy {

  //#region Properties

  private _htmlContent: string;

  private _subscription: Subscription;

  //#endregion

  //#region Accessors

  public get htmlContent(): string {
    return this._htmlContent;
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(DEMO_PAGE_SERVICE_PROVIDER) protected readonly demoPageService: IDemoPageService,
                     protected readonly changeDetectorRef: ChangeDetectorRef) {
    this._htmlContent = '';
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycle hooks

  public ngOnInit(): void {
    const loadDemoContentSubscription = this.demoPageService.loadDemoContentAsync()
      .subscribe(content => {
        this._htmlContent = content;
        this.changeDetectorRef.markForCheck();
      });
    this._subscription.add(loadDemoContentSubscription);
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  //#endregion
}
