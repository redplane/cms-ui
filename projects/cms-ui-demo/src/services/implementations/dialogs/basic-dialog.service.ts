import {DialogService, IDialogService} from '@cms-ui/core';
import {Injectable, Injector} from '@angular/core';

@Injectable()
export class BasicDialogService extends DialogService {

  //#region Constructor

  public constructor(injector: Injector) {
    super(injector);
  }

  //#endregion
}
