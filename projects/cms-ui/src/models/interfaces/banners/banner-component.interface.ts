import {EventEmitter} from '@angular/core';

export interface IBannerComponent {

  //#region Properties

  // Id of banner.
  id: string;

  // Event which is raised when component is being requested to be disposed.
  readonly disposeRequestingEvent: EventEmitter<void>;

  //#endregion

  //#region Methods

  handleBannerClick(): void;

  //#endregion
}
