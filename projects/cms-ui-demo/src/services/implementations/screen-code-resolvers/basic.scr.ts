import {DefaultScreenCodeResolver, IScreenCodeResolver} from '@cms-ui/core';
import {Injectable} from '@angular/core';
import {ScreenCodes} from '../../../constants/screen.codes';

@Injectable()
export class BasicScr extends DefaultScreenCodeResolver {

  //#region Constructor

  public constructor() {

    const codeToUrl: { [key: string]: string } = {};
    codeToUrl[ScreenCodes.uiModule] = '/ui-module/{{id}}';

    super(codeToUrl);
  }

  //#endregion
}
