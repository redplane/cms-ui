import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'basic-bs-dialog',
  templateUrl: 'basic-bs-dialog.component.html',
  styleUrls: ['basic-bs-dialog.component.scss']
})
export class BasicBsDialogComponent {

  //#region Constructor

  public constructor(public activeModal: NgbActiveModal) {
  }

  //#endregion
}
