import {Category} from '../models/category';
import {UiModule} from '../models/ui-module';

export class CategoryViewModel extends Category {

  //#region Properties

  public uiModules?: UiModule[];

  //#endregion

}
