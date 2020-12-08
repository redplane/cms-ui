import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NumericValidator} from '../../validators/numeric.validator';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'validation-summarizer-demo',
  templateUrl: 'validation-summarizer-demo.component.html',
  styleUrls: ['validation-summarizer-demo.component.scss']
})
export class ValidationSummarizerDemoComponent {

  //#region Properties

  public readonly studentForm: FormGroup;

  public readonly studentNameControl: FormControl;

  public readonly studentAgeControl: FormControl;

  public readonly securityNoControl: FormControl;

  public readonly customerForm: FormGroup;

  public readonly customerNameControl: FormControl;

  public readonly customerAgeControl: FormControl;

  //#endregion

  //#region Constructor

  public constructor() {

    this.studentNameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.studentAgeControl = new FormControl('', [Validators.min(10)]);
    this.securityNoControl = new FormControl('');

    this.studentForm = new FormGroup({
      name: this.studentNameControl,
      age: this.studentAgeControl,
      securityNo: this.securityNoControl
    });


    this.customerNameControl = new FormControl('', [Validators.required]);
    this.customerAgeControl = new FormControl('', NumericValidator.notSmallerThan(10));

    this.customerForm = new FormGroup({
      name: this.customerNameControl,
      age: this.customerAgeControl
    });
  }

  //#endregion

  //#region Methods

  //#endregion
}
