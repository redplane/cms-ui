import {Entity} from './entity';

export class UiModule extends Entity {

  //#region Properties

  public name?: string;

  public path?: string;

  public description?: string;

  //#endregion

  //#region Constructor

  public constructor(public readonly id: string) {
    super();
    this.createdTime = new Date().getTime();
  }

  //#endregion

}
