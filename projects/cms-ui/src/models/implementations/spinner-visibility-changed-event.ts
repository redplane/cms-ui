import {Visibilities} from '../../enums/visibilities';

export class SpinnerVisibilityChangedEvent {

  //#region Constructor

  public constructor(public containerId: string,
                     public id: string,
                     public visibility: Visibilities) {
  }

  //#endregion

}
