import {Injector, Pipe, PipeTransform} from '@angular/core';
import {ISmartNavigatorService} from '../../services';
import {SMART_NAVIGATOR_PROVIDER} from '../../constants';
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
    this.smartNavigatorService = injector.get(SMART_NAVIGATOR_PROVIDER);
  }


  //#endregion

  //#region Methods

  public transform(value: string, routeParams?: { [key: string]: any; },
                   extras?: NavigationExtras): UrlTree | null {
    return this.smartNavigatorService.buildUrlTree(value, routeParams, extras);
  }

  //#endregion

}
