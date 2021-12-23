import {DefaultScreenCodeResolver, IScreenCodeResolver} from '@cms-ui/core';
import {Injectable} from '@angular/core';
import {ScreenCodes} from '../../../constants/screen.codes';

@Injectable()
export class BasicScr extends DefaultScreenCodeResolver {

  //#region Constructor

  public constructor() {

    const codeToUrl: { [key: string]: string } = {};
    codeToUrl[ScreenCodes.uiModule] = '/ui-module/{{id}}';
    codeToUrl[ScreenCodes.uiModuleSection] ='/ui-module/{{uiModuleId}}/{{sectionId}}';

    super(codeToUrl);
  }

  //#endregion
}
