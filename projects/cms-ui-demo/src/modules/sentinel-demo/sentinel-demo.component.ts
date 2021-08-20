import {Component, HostBinding} from '@angular/core';
import {ScreenCodes} from '../../constants/screen.codes';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sentinel-demo',
  templateUrl: 'sentinel-demo.component.html'
})
export class SentinelDemoComponent {

  //#region Properties

  @HostBinding('class')
  public get hostClass(): string {
    return 'page';
  }

  //#endregion

  //#region Accessors

  public get screenCodes(): typeof ScreenCodes {
    return ScreenCodes;
  }

  //#endregion
}
