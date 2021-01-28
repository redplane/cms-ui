import {IScreenCodeResolver} from '../interfaces';
import {cloneDeep} from 'lodash-es';

export abstract class DefaultScreenCodeResolver implements IScreenCodeResolver {

  //#region Properties

  // Mapping between screen code & url.
  // tslint:disable-next-line:variable-name
  protected _codeToUrl: { [key: string]: string };

  //#endregion

  //#region Constructor

  protected constructor(codeToUrl: { [key: string]: string }) {
    this._codeToUrl = cloneDeep(codeToUrl);
  }

  //#endregion

  //#region Methods

  // Convert screen code to url.
  public loadUrl(code: string): string | null {
    if (!code || !code.length) {
      return null;
    }

    if (!this._codeToUrl) {
      return null;
    }

    return this._codeToUrl[code];
  }

  //#endregion

}
