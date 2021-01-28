import {DefaultScreenCodeResolver, IScreenCodeResolver} from '@cms-ui/core';
import {Injectable} from '@angular/core';
import {ScreenCodeConstant} from '../../../constants/screen-code.constant';

@Injectable()
export class SmartNavigatorDemoScreenCodeResolver extends DefaultScreenCodeResolver {

  //#region Constructor

  public constructor() {

    const codeToUrl: { [key: string]: string } = {};
    codeToUrl[ScreenCodeConstant.smartNavigatorDemo] = '/smart-navigator-demo';
    codeToUrl[ScreenCodeConstant.smartNavigatorTab01Demo] = '/smart-navigator-demo/tab-01';
    codeToUrl[ScreenCodeConstant.smartNavigatorTab02Demo] = '/smart-navigator-demo/tab-02';
    codeToUrl[ScreenCodeConstant.smartNavigatorTab03Demo] = '/smart-navigator-demo/tab-03';

    super(codeToUrl);
  }

  //#endregion
}
