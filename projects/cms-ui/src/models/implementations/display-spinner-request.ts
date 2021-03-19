import {ISpinnerOptions} from '../interfaces';

export class DisplaySpinnerRequest {

  //#region Constructor

  public constructor(public containerId: string,
                     public id: string,
                     public options?: ISpinnerOptions) {
  }

  //#endregion

}
