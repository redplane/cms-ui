import {Inject, Injector, Pipe, PipeTransform} from '@angular/core';
import {SMART_NAVIGATOR_PROVIDER} from '../../constants/injectors/injectors';
import {ISmartNavigatorService} from '../../services/interfaces/smart-navigator-service.interface';

@Pipe({
  name: 'toRawUrl'
})
export class ToRawUrlPipe implements PipeTransform {

  //#region Services

  protected readonly smartNavigatorService: ISmartNavigatorService;

  //#endregion

  //#region Constructor

  public constructor(injector: Injector) {
    this.smartNavigatorService = injector.get(SMART_NAVIGATOR_PROVIDER);
  }


  //#endregion

  //#region Methods

  public transform(value: string, ...args: any[]): string | null {
    return this.smartNavigatorService.loadRawUrl(value);
  }

  //#endregion
}
