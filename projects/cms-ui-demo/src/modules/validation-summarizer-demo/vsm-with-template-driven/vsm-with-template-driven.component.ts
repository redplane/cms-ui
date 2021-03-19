import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NgControl, Validators} from '@angular/forms';
import {KeyValue} from '@angular/common';
import {Subscription} from 'rxjs';
import {ClientViewModel} from '../../../view-models/client.view-model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vsm-with-template-driven-demo',
  templateUrl: 'vsm-with-template-driven.component.html'
})
export class VsmWithTemplateDrivenComponent implements OnInit, OnDestroy {

  //#region Properties

  public readonly client: ClientViewModel;

  //#endregion

  //#region Constructor

  public constructor() {
    this.client = new ClientViewModel();
  }

  //#endregion

  //#region Methods

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
  }

  //#endregion
}
