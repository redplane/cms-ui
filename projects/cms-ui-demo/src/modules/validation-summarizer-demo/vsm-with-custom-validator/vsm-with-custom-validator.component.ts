import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NgControl, Validators} from '@angular/forms';
import {KeyValue} from '@angular/common';
import {Subscription} from 'rxjs';
import {ClientViewModel} from '../../../view-models/client.view-model';
import {NumericValidator} from '../../../validators/numeric.validator';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vsm-with-template-driven-demo',
  templateUrl: 'vsm-with-custom-validator.component.html'
})
export class VsmWithCustomValidatorComponent implements OnInit, OnDestroy {

  //#region Properties

  public readonly customerForm: FormGroup;

  public readonly customerNameControl: FormControl;

  public readonly customerAgeControl: FormControl;

  //#endregion

  //#region Constructor

  public constructor() {
    this.customerNameControl = new FormControl('', [Validators.required]);
    this.customerAgeControl = new FormControl('', [NumericValidator.notSmallerThan(10)]);

    this.customerForm = new FormGroup({
      name: this.customerNameControl,
      age: this.customerAgeControl
    });
  }

  //#endregion

  //#region Methods

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
  }

  //#endregion
}
