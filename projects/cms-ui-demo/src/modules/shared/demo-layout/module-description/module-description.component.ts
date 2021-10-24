import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MODULE_DESCRIPTION_SERVICE_PROVIDER} from '../../../../constants/injectors';
import {IModuleDescriptionService} from './module-description-service.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'module-description',
  templateUrl: 'module-description.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModuleDescriptionComponent implements OnInit, OnDestroy {

  //#region Properties

  private _htmlContent: string;

  private readonly _subscription: Subscription;

  //#endregion

  //#region Accessors

  public get htmlContent(): string {
    return this._htmlContent;
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(MODULE_DESCRIPTION_SERVICE_PROVIDER)
                     protected readonly moduleDescriptionService: IModuleDescriptionService,
                     protected readonly changeDetectorRef: ChangeDetectorRef) {
    this._htmlContent = '';
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycle hooks

  public ngOnInit(): void {

    // Load html content.
    const loadHtmlContentSubscription = this.moduleDescriptionService.loadModuleDescriptionAsync()
      .subscribe((htmlContent: string) => {
        this._htmlContent = htmlContent;
        this.changeDetectorRef.markForCheck();
      });
    this._subscription.add(loadHtmlContentSubscription);

  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  //#endregion
}
