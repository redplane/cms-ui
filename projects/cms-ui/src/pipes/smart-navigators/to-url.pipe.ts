import {Injector, Pipe, PipeTransform} from '@angular/core';
import {ISmartNavigatorService} from '../../services/interfaces/smart-navigator-service.interface';
import {SMART_NAVIGATOR_PROVIDER} from '../../constants/injectors/injectors';
import {NavigationExtras, UrlTree} from '@angular/router';

@Pipe({
  name: 'toUrl'
})
export class ToUrlPipe implements PipeTransform {

  //#region Services

  protected readonly smartNavigatorService: ISmartNavigatorService;

  //#endregion

  //#region Constructor

  public constructor(injector: Injector) {
    this.smartNavigatorService = injector.get(SMART_NAVIGATOR_PROVIDER);
  }


  //#endregion

  //#region Methods

  public transform(value: UrlTree): string {
    return value.toString();
  }

  //#endregion

}
