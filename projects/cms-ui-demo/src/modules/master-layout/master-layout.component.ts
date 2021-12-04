import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'master-layout',
  templateUrl: 'master-layout.component.html',
  styleUrls: ['master-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasterLayoutComponent {
  //#region Constructor

  public constructor(@Inject(DOCUMENT) protected readonly document: Document) {
  }

  //#endregion

  //#region Life cycle

  //#endregion

  //#region Methods

  //#endregion
}
