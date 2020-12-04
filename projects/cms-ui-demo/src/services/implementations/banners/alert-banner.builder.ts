import {Observable, of} from 'rxjs';
import {ComponentFactoryResolver, ComponentRef, Injectable, Injector} from '@angular/core';
import {IBannerBuilder, IBannerComponent, IBannerSettings} from '@cms-ui/core';
import {AlertBannerSettings} from '../../../models/banners/alert-banner-settings';
import {AlertBannerComponent} from '../../../modules/shared/alert-banner/alert-banner.component';

@Injectable()
export class AlertBannerBuilder implements IBannerBuilder {

  //#region Constructor

  public constructor(protected componentFactoryResolver: ComponentFactoryResolver,
                     protected injector: Injector) {
  }

  //#endregion

  //#region Methods

  public buildAsync(settings: IBannerSettings): Observable<ComponentRef<IBannerComponent>> {
    const alertBannerSettings = settings as AlertBannerSettings;
    const cfr = this.componentFactoryResolver
        .resolveComponentFactory(AlertBannerComponent);
    const componentRef = cfr.create(this.injector);
    componentRef.instance.id = alertBannerSettings.id;
    componentRef.instance.message = alertBannerSettings.message;
    componentRef.instance.clickHandler = alertBannerSettings.clickHandler;
    componentRef.instance.clickOutsideHandler = alertBannerSettings.clickOutsideHandler;

    return of(componentRef);
  }

  public canBuildAsync(settings: IBannerSettings): Observable<boolean> {
    return of((settings instanceof AlertBannerSettings));
  }

  //#endregion

}
