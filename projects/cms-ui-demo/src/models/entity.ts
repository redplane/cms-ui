import {ItemAvailabilities} from '../enumerations/item-availabilities';

export class Entity {

  //#region Properties

  public availability: ItemAvailabilities;

  public createdTime?: number;

  public lastModifiedTime?: number;

  //#endregion

  //#region Constructor

  public constructor() {
    this.availability = ItemAvailabilities.available;
  }

  //#endregion

}
