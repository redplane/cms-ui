import {DefaultScreenCodeResolver, IScreenCodeResolver} from '@cms-ui/core';
import {Injectable} from '@angular/core';
import {ScreenCodes} from '../../../constants/screen.codes';

@Injectable()
export class SmartNavigatorDemoScreenCodeResolver extends DefaultScreenCodeResolver {

  //#region Constructor

  public constructor() {

    const codeToUrl: { [key: string]: string } = {};
    codeToUrl[ScreenCodes.smartNavigatorDemo] = '/smart-navigator-demo';
    codeToUrl[ScreenCodes.smartNavigatorTab01Demo] = '/smart-navigator-demo/tab-01';
    codeToUrl[ScreenCodes.smartNavigatorTab02Demo] = '/smart-navigator-demo/tab-02';
    codeToUrl[ScreenCodes.smartNavigatorTab03Demo] = '/smart-navigator-demo/tab-03';

    super(codeToUrl);
  }

  //#endregion
}
