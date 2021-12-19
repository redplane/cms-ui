import {Entity} from './entity';

export class Category extends Entity {

  //#region Properties

  public name!: string;

  // Path of category section.
  public path!: string;

  public description!: string;

  //#endregion

}
