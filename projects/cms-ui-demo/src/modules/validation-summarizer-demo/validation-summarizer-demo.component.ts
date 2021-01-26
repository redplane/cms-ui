import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NgControl, Validators} from '@angular/forms';
import {NumericValidator} from '../../validators/numeric.validator';
import {KeyValue} from '@angular/common';
import {Subscription} from 'rxjs';
import {ClientViewModel} from '../../view-models/client.view-model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'validation-summarizer-demo',
  templateUrl: 'validation-summarizer-demo.component.html',
  styleUrls: ['validation-summarizer-demo.component.scss']
})
export class ValidationSummarizerDemoComponent implements OnInit, OnDestroy {

  //#region Properties

  public readonly studentForm: FormGroup;

  public readonly studentNameControl: FormControl;

  public readonly studentAgeControl: FormControl;

  public readonly securityNoControl: FormControl;

  public readonly customerForm: FormGroup;

  public readonly customerNameControl: FormControl;

  public readonly customerAgeControl: FormControl;

  public readonly productForm: FormGroup;

  public readonly productNameControl: FormControl;

  public readonly visibilityOptions: KeyValue<string, boolean>[];

  public handlerVisibleControl: FormControl;

  public visibilityHandler: ((ngControl: AbstractControl | NgControl) => boolean) |null;

  public readonly client: ClientViewModel;

  // tslint:disable-next-line:variable-name
  protected _subscription: Subscription;

  //#endregion

  //#region Constructor

  public constructor() {

    this._subscription = new Subscription();

    this.studentNameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.studentAgeControl = new FormControl('', [Validators.min(10)]);
    this.securityNoControl = new FormControl('');

    this.studentForm = new FormGroup({
      name: this.studentNameControl,
      age: this.studentAgeControl,
      securityNo: this.securityNoControl
    });


    this.customerNameControl = new FormControl('', [Validators.required]);
    this.customerAgeControl = new FormControl('', [NumericValidator.notSmallerThan(10)]);

    this.customerForm = new FormGroup({
      name: this.customerNameControl,
      age: this.customerAgeControl
    });

    this.productNameControl = new FormControl('', [Validators.required]);
    this.handlerVisibleControl = new FormControl(false);
    this.productForm = new FormGroup({
      name: this.productNameControl,
      handlerVisible: this.handlerVisibleControl
    });

    this.visibilityOptions = [
      {
        key: 'VALIDATION_SUMMARIZER_DEMO.YES',
        value: true
      },
      {
        key: 'VALIDATION_SUMMARIZER_DEMO.NO',
        value: false
      }
    ];

    this.visibilityHandler = _ => this.handlerVisibleControl.value;

    this.client = new ClientViewModel();
  }

  //#endregion

  //#region Life cycles

  public ngOnInit(): void {

    const hookVisibilityChangedEventSubscription = this.handlerVisibleControl
      .valueChanges
      .subscribe(value => {
        this.visibilityHandler = (ngControl: AbstractControl | NgControl): boolean => {
          if (!value) {
            return false;
          }

          return (ngControl.invalid && (ngControl.dirty || ngControl.touched)) as boolean;
        };
      });

    this._subscription.add(hookVisibilityChangedEventSubscription);
  }

  public ngOnDestroy(): void {

    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }

  //#endregion

}
