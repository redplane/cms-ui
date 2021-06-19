import {Component, Inject} from '@angular/core';
import {IValidationSummarizerService, VALIDATION_SUMMARIZER_PROVIDER} from '@cms-ui/core';
import {VmsChildModuleControls} from './vms-child-module-controls';
import {FormGroup} from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vms-child-module',
  templateUrl: 'vms-child-module.component.html',
  styleUrls: ['vms-child-module.component.scss']
})
export class VmsChildModuleComponent {

  //#region Properties

  // tslint:disable-next-line:variable-name
  private readonly _section: VmsChildModuleControls;

  //#endregion

  //#region Accessors

  public get controlNames(): typeof VmsChildModuleControls {
    return VmsChildModuleControls;
  }

  public get formGroup(): FormGroup {
    return this._section.toFormGroup();
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(VALIDATION_SUMMARIZER_PROVIDER) protected readonly validationSummarizerService: IValidationSummarizerService) {
    this._section = new VmsChildModuleControls();
  }

  //#endregion

  //#region Methods


  //#endregion
}
