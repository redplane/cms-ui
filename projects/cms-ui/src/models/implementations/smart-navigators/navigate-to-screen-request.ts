import {NavigationExtras} from '@angular/router';

export class NavigateToScreenRequest {

  //#region Properties

  public code: string;

  public routeParams?: { [key: string]: any; };

  public extras?: NavigationExtras;

  //#endregion

  //#region Constructor

  public constructor(code: string) {
    this.code = code;
  }

  //#endregion

}
