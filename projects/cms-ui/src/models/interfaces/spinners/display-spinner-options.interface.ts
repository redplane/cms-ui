import {ComponentFactory} from '@angular/core';

export class IDisplaySpinnerOptions {

  //#region Properties

  // Whether previous displayed spinner must be destroyed or not.
  purge?: boolean;

  // Component factory which generates component to be displayed inside spinner container.
  // If no component factory is defined, the default spinner will be used instead.
  componentFactory?: ComponentFactory<any>;

  //#endregion

}
