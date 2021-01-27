import {NavigationExtras} from '@angular/router';

export class NavigateToScreenRequest<T> {

  //#region Properties

  public code: string;

  public readonly routeParams?: T;

  public readonly extras?: NavigationExtras;

  //#endregion

  //#region Constructor

  public constructor(code: string,
                     routeParams?: T,
                     extras?: NavigationExtras) {
    this.code = code;
    this.routeParams = routeParams;
    this.extras = extras;
  }

  //#endregion

}
