import {Component, Injector, OnInit} from '@angular/core';
import {VmsValidationItemTemplateControls} from './vms-validation-item-template-controls';
import {FormGroup} from '@angular/forms';
import {VmsChildValidationItemTemplateControls} from './vms-child-validation-item-template/vms-child-validation-item-template-controls';
import {VALIDATION_SUMMARIZER_PROVIDER} from '@cms-ui/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vms-validation-item-template',
  templateUrl: 'vms-validation-item-template.component.html',
  styleUrls: ['vms-validation-item-template.component.scss']
})
export class VmsValidationItemTemplateComponent implements OnInit {

  //#region Properties

  // tslint:disable-next-line:variable-name
  private readonly _section: VmsValidationItemTemplateControls;

  // tslint:disable-next-line:variable-name
  private readonly _childSection: VmsChildValidationItemTemplateControls;

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

  public constructor(private readonly injector: Injector) {
    this._section = new VmsValidationItemTemplateControls();
    this._childSection = new VmsChildValidationItemTemplateControls();
  }

  //#endregion

  //#region Methods

  public ngOnInit(): void {

    const formGroup = this._section.toFormGroup();
    formGroup
      .addControl(VmsChildValidationItemTemplateControls.childUsername,
        // tslint:disable-next-line:no-non-null-assertion
        this._childSection.loadControl(VmsChildValidationItemTemplateControls.childUsername)!);

    formGroup
      .addControl(VmsChildValidationItemTemplateControls.childAge,
        // tslint:disable-next-line:no-non-null-assertion
        this._childSection.loadControl(VmsChildValidationItemTemplateControls.childAge)!);
  }

  //#endregion
}
