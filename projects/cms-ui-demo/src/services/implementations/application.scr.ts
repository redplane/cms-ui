import {DefaultScreenCodeResolver} from '@cms-ui/core';
import {Injectable} from '@angular/core';
import {ScreenCodes} from '../../constants/screen.codes';

@Injectable()
export class ApplicationScr extends DefaultScreenCodeResolver {

  //#region Constructor

  constructor() {

    const codeToUrl: { [id: string]: string } = {};

    super(codeToUrl);
  }

  //#endregion
}
