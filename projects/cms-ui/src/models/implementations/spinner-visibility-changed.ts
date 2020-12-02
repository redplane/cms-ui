import {v4 as uuid} from 'uuid';
import {Visibilities} from '../../enums/visibilities';

export class SpinnerVisibilityChanged {

  //#region Properties

  public readonly id: string;

  public visibility: Visibilities;

  //#endregion

  //#region Constructor

  public constructor(visibility: Visibilities) {
    this.id = uuid();
    this.visibility = visibility;
  }

  //#endregion

}
