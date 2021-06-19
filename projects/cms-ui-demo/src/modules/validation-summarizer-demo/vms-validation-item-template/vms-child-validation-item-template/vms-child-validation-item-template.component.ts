import {Component, Injector, OnInit} from '@angular/core';
import {VmsChildValidationItemTemplateControls} from './vms-child-validation-item-template-controls';
import {ControlContainer, FormGroup, FormGroupDirective} from '@angular/forms';
import {VALIDATION_SUMMARIZER_PROVIDER} from '@cms-ui/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vms-child-validation-item-template',
  templateUrl: 'vms-child-validation-item-template.component.html'
})
export class VmsChildValidationItemTemplateComponent implements OnInit {

  //#region Properties

  // Container of controls.
  // tslint:disable-next-line:variable-name
  private _formGroup: FormGroup | undefined;

  //#endregion

  //#region Accessors

  public get controlNames(): typeof VmsChildValidationItemTemplateControls {
    return VmsChildValidationItemTemplateControls;
  }

  public get formGroup(): FormGroup | undefined {
    return this._formGroup;
  }

  //#endregion

  //#region Constructor

  public constructor(protected readonly controlContainer: ControlContainer,
                     private readonly injector: Injector) {
  }

  //#endregion

  //#region Life cycle

  public ngOnInit(): void {
    if (this.controlContainer instanceof FormGroupDirective) {
      const formGroupDirective = this.controlContainer as FormGroupDirective;
      this._formGroup = formGroupDirective.form;
    }

  }

  //#endregion
}
