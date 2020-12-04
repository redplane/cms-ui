import {Observable, of} from 'rxjs';
import {ComponentFactoryResolver, ComponentRef, Injectable, Injector} from '@angular/core';
import {IBannerContentBuilder, IBannerContentComponent, IBannerContentSettings} from '@cms-ui/core';
import {AlertBannerContentSettings} from '../../../models/banners/alert-banner-content-settings';
import {AlertBannerContentComponent} from '../../../modules/shared/alert-banner-content/alert-banner-content.component';

@Injectable()
export class AlertBannerContentBuilder implements IBannerContentBuilder {

  //#region Constructor

  public constructor(protected componentFactoryResolver: ComponentFactoryResolver,
                     protected injector: Injector) {
  }

  //#endregion

  //#region Methods

  public buildAsync(settings: IBannerContentSettings): Observable<ComponentRef<IBannerContentComponent>> {
    const alertBannerSettings = settings as AlertBannerContentSettings;
    const cfr = this.componentFactoryResolver
        .resolveComponentFactory(AlertBannerContentComponent);
    const componentRef = cfr.create(this.injector);
    componentRef.instance.id = alertBannerSettings.id;
    componentRef.instance.message = alertBannerSettings.message;
    componentRef.instance.clickHandler = alertBannerSettings.clickHandler;
    componentRef.instance.clickOutsideHandler = alertBannerSettings.clickOutsideHandler;

    return of(componentRef);
  }

  public canBuildAsync(settings: IBannerContentSettings): Observable<boolean> {

    const ableToBeBuilt = (settings instanceof AlertBannerContentSettings);
    return of(ableToBeBuilt);
  }

  //#endregion

}
