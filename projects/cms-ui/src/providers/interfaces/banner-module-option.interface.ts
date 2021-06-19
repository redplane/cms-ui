import {Provider} from '@angular/core';

export interface IBannerModuleOption {

  //#region Properties

  // This is for implementing custom banner service.
  // If it is not defined, the default service will be used.
  serviceProvider?: Provider;

  // Content builder providers.
  contentBuilderProviders?: Provider[];

  //#endregion

}
