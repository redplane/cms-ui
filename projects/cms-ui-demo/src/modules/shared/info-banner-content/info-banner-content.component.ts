import {Component, ElementRef} from '@angular/core';
import {AlertBannerContentComponent} from '../alert-banner-content/alert-banner-content.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'info-banner-content',
  templateUrl: 'info-banner-content.component.html'
})
export class InfoBannerContentComponent extends AlertBannerContentComponent {

  //#region Constructor

  public constructor(protected elementRef: ElementRef) {
    super(elementRef);
  }

  //#endregion
}
