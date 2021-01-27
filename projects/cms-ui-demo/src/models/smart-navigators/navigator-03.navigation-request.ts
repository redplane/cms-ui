import {NavigateToScreenRequest} from '@cms-ui/core';
import {NavigationExtras} from '@angular/router';
import {ScreenCodeConstant} from '../../constants/screen-code.constant';

export class Navigator03NavigationRequest extends NavigateToScreenRequest<void> {

  //#region Constructor

  public constructor(extras?: NavigationExtras) {
    super(ScreenCodeConstant.smartNavigatorTab03Demo, void(0), extras);
  }

  //#endregion
}
