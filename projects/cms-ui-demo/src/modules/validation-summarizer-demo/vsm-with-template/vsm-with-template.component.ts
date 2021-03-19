import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vms-with-template',
  templateUrl: 'vsm-with-template.component.html',
  styleUrls: ['./vsm-with-template.component.scss']
})
export class VsmWithTemplateComponent {

  //#region Properties

  public readonly nameControl: FormControl;

  public readonly quantityControl: FormControl;

  public readonly productFormGroup: FormGroup;

  //#endregion

  //#region Constructor

  public constructor() {

    this.nameControl = new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10)]);

    this.quantityControl = new FormControl(null, [
      Validators.min(5),
      Validators.max(10)]
    );

    this.productFormGroup = new FormGroup({
      name: this.nameControl,
      quantity: this.quantityControl
    });

  }

  //#endregion

  //#region Methods

  //#endregion
}
