import {NavigateToScreenRequest} from '@cms-ui/core';
import {NavigationExtras} from '@angular/router';
import {ScreenCodes} from '../../constants/screen.codes';

export class Navigator03NavigationRequest extends NavigateToScreenRequest<void> {

  //#region Constructor

  public constructor(extras?: NavigationExtras) {
    super(ScreenCodes.smartNavigatorTab03Demo, void(0), extras);
  }

  //#endregion
}
