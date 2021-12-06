import {Entity} from './entity';

export class Section extends Entity {

  //#region Properties

  public name!: string;

  public content!: string;

  //#endregion

  //#region Constructor

  public constructor(public readonly id: string) {
    super();

    this.createdTime = new Date().getTime();
  }

  //#endregion

}
