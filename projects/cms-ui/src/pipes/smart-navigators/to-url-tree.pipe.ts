import {Injector, Pipe, PipeTransform} from '@angular/core';
import {ISmartNavigatorService} from '../../services/interfaces/smart-navigator-service.interface';
import {SMART_NAVIGATOR_SERVICE} from '../../constants/injectors/injectors';
import {NavigationExtras, UrlTree} from '@angular/router';

@Pipe({
  name: 'toUrlTree'
})
export class ToUrlTreePipe implements PipeTransform {

  //#region Services

  protected readonly smartNavigatorService: ISmartNavigatorService;

  //#endregion

  //#region Constructor

  public constructor(injector: Injector) {
    this.smartNavigatorService = injector.get(SMART_NAVIGATOR_SERVICE);
  }


  //#endregion

  //#region Methods

  public transform(value: string, routeParams?: { [key: string]: any; },
                   extras?: NavigationExtras): UrlTree {

    if (extras) {
      extras.queryParams = null;
    }

    return this.smartNavigatorService.buildUrlTree(value, routeParams, extras);
  }

  //#endregion

}
