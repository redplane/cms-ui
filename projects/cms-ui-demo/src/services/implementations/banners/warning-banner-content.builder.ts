import {IBannerContentBuilder, IBannerContentComponent, IBannerContentSettings} from '@cms-ui/core';
import {ComponentFactoryResolver, ComponentRef, Injectable, Injector} from '@angular/core';
import {Observable, of} from 'rxjs';
import {WarningBannerContentSettings} from '../../../models/banners/warning-banner-content-settings';
import {WarningBannerContentComponent} from '../../../modules/shared/warning-banner-content/warning-banner-content.component';

@Injectable()
export class WarningBannerContentBuilder implements IBannerContentBuilder {

  //#region Constructor

  public constructor(protected componentFactoryResolver: ComponentFactoryResolver,
                     protected injector: Injector) {
  }

  //#endregion

  //#region Methods

  public buildAsync(settings: IBannerContentSettings): Observable<ComponentRef<IBannerContentComponent>> {
    const alertBannerSettings = settings as WarningBannerContentSettings;
    const cfr = this.componentFactoryResolver
      .resolveComponentFactory(WarningBannerContentComponent);
    const componentRef = cfr.create(this.injector);
    componentRef.instance.id = alertBannerSettings.id;
    componentRef.instance.message = alertBannerSettings.message;
    componentRef.instance.clickHandler = alertBannerSettings.clickHandler;
    componentRef.instance.clickOutsideHandler = alertBannerSettings.clickOutsideHandler;

    return of(componentRef);
  }

  public canBuildAsync(settings: IBannerContentSettings): Observable<boolean> {

    const ableToBeBuilt = (settings instanceof WarningBannerContentSettings);
    return of(ableToBeBuilt);
  }

}
