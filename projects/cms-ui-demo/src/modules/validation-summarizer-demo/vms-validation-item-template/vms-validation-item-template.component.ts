import {Component} from '@angular/core';
import {VmsValidationItemTemplateControls} from './vms-validation-item-template-controls';
import {FormGroup} from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vms-validation-item-template',
  templateUrl: 'vms-validation-item-template.component.html',
  styleUrls: ['vms-validation-item-template.component.scss']
})
export class VmsValidationItemTemplateComponent {

  //#region Properties

  // tslint:disable-next-line:variable-name
  private readonly _section: VmsValidationItemTemplateControls;

  //#endregion

  //#region Accessors

  // Control names.
  public get controlNames(): typeof VmsValidationItemTemplateControls {
    return VmsValidationItemTemplateControls;
  }

  // Control container.
  public get formGroup(): FormGroup {
    return this._section.toFormGroup();
  }

  //#endregion

  //#region Constructor

  public constructor() {
    this._section = new VmsValidationItemTemplateControls();
  }

  //#endregion
}
