import {IBannerContentBuilder, IBannerContentComponent, IBannerContentSettings} from '@cms-ui/core';
import {ComponentFactoryResolver, ComponentRef, Injectable, Injector} from '@angular/core';
import {Observable, of} from 'rxjs';
import {InfoBannerContentSettings} from '../../../models/banners/info-banner-content-settings';
import {InfoBannerContentComponent} from '../../../modules/shared/info-banner-content/info-banner-content.component';

@Injectable()
export class InfoBannerContentBuilder implements IBannerContentBuilder {

  //#region Constructor

  public constructor(protected componentFactoryResolver: ComponentFactoryResolver,
                     protected injector: Injector) {
  }

  //#endregion

  //#region Methods

  public buildAsync(settings: IBannerContentSettings): Observable<ComponentRef<IBannerContentComponent>> {
    const infoBannerContentSettings = settings as InfoBannerContentSettings;
    const cfr = this.componentFactoryResolver
      .resolveComponentFactory(InfoBannerContentComponent);
    const componentRef = cfr.create(this.injector);
    componentRef.instance.id = infoBannerContentSettings.id;
    componentRef.instance.message = infoBannerContentSettings.message;
    componentRef.instance.clickHandler = infoBannerContentSettings.clickHandler;
    componentRef.instance.clickOutsideHandler = infoBannerContentSettings.clickOutsideHandler;

    return of(componentRef);
  }

  public canBuildAsync(settings: IBannerContentSettings): Observable<boolean> {
    const ableToBeBuilt = settings instanceof InfoBannerContentSettings;
    return of(ableToBeBuilt);
  }

  //#endregion

}
