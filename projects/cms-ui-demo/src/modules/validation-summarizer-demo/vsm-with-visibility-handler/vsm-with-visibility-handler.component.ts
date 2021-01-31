import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NgControl, Validators} from '@angular/forms';
import {KeyValue} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vsm-with-visibility-handler-demo',
  templateUrl: 'vsm-with-visibility-handler.component.html'
})
export class VsmWithVisibilityHandlerComponent implements OnInit, OnDestroy {

  //#region Properties

  public readonly productForm: FormGroup;

  public readonly productNameControl: FormControl;

  public readonly visibilityOptions: KeyValue<string, boolean>[];

  public handlerVisibleControl: FormControl;

  public visibilityHandler: ((ngControl: AbstractControl | NgControl) => boolean) | null;

  protected readonly subscription: Subscription;

  //#endregion

  //#region Constructor

  public constructor() {
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
    this.subscription = new Subscription();
  }

  //#endregion

  //#region Methods

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

    this.subscription.add(hookVisibilityChangedEventSubscription);
  }

  public ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  //#endregion
}
