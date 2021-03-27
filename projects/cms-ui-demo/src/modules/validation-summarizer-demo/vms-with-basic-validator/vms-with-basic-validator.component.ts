import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NgControl, Validators} from '@angular/forms';
import {KeyValue} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vsm-with-visibility-handler-demo',
  templateUrl: 'vms-with-basic-validator.component.html'
})
export class VmsWithBasicValidatorComponent implements OnInit, OnDestroy {

  //#region Properties

  public readonly studentForm: FormGroup;

  public readonly studentNameControl: FormControl;

  public readonly studentAgeControl: FormControl;

  public readonly securityNoControl: FormControl;

  @ViewChild('form1', {static: false})
  // @ts-ignore
  public form1: ElementRef;

  @ViewChild('form', {static: false})
  // @ts-ignore
  public form2: ElementRef;

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
  }

  //#endregion

  //#region Methods

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
  }

  //#endregion
  public scrollToItem(item: string): void {
   switch (item) {
     case '1':
       this.form1.nativeElement.scrollIntoView({
         behavior: 'smooth',
         block: 'start',
         inline: 'nearest'
       });
       break;
     default:
       return;
   }
  }
}
