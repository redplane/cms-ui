import {ChangeDetectorRef, ElementRef, Inject, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormControlDirective, NgControl, NgModel} from '@angular/forms';
import {Subscription} from 'rxjs';
import {VALIDATION_SUMMARIZER_SERVICE} from '../../../../constants';
import {IValidationSummarizerService} from '../../../../services';

export abstract class ValidatorClassBase implements OnInit, OnDestroy {

  //#region Properties

  protected _control: AbstractControl | NgControl | null = null;

  // Handler for handling summarizer visibility.
  // tslint:disable-next-line:variable-name
  protected _visibilityHandler: ((ngControl: AbstractControl | NgControl) => boolean | null);

  // Subscription about status changes.
  protected _hookStatusChangesSubscription: Subscription | undefined = undefined;

  // Classes for applying into component.
  protected _classes: string[] = [];

  //#endregion

  //#region Accessors

  public set classes(value: string[] | string | null) {
    if (typeof (value) === 'string') {
      this._classes = [value];
      return;
    }

    if ((value instanceof Array) && value.every(x => typeof (x) === 'string')) {
      this._classes = value;
      return;
    }
  }

  public set visibilityHandler(value: ((ngControl: AbstractControl | NgControl) => boolean | null)) {
    this._visibilityHandler = value;
    this.buildElementClasses(this._control);
  }

  //#endregion

  //#region Constructor

  protected constructor(@Inject(VALIDATION_SUMMARIZER_SERVICE)
                        protected readonly validationSummarizerService: IValidationSummarizerService,
                        protected readonly changeDetectorRef: ChangeDetectorRef,
                        protected readonly elementRef: ElementRef) {
    this._visibilityHandler = ngControl => {
      if (ngControl instanceof FormControl) {
        return ngControl.invalid && (ngControl.dirty || ngControl.touched);
      }

      if (ngControl instanceof FormControlDirective) {
        const formControlDirective = ngControl as FormControlDirective;
        return formControlDirective.invalid && (formControlDirective.dirty || formControlDirective.touched);
      }

      if (ngControl instanceof NgModel) {
        const formControl = (ngControl as NgModel).control;
        return formControl.invalid && (formControl.dirty || formControl.touched);
      }

      return null;
    };
  }

  //#endregion

  //#region Life cycle hooks

  public ngOnInit(): void {
    this.buildElementClasses(this._control);
  }

  public ngOnDestroy(): void {
    this._hookStatusChangesSubscription?.unsubscribe();
  }

  //#endregion

  //#region Internal methods

  protected buildElementClasses(control: AbstractControl | NgControl | null): void {
    if (!control) {
      return;
    }

    const classes: string[] = this.getValidationClasses();
    const shouldValidationMessageVisible = this.ableToDisplayValidationMessages(control);

    const htmlElement = this.elementRef.nativeElement as HTMLElement;

    if (!control.errors || !Object.keys(control.errors) || !shouldValidationMessageVisible) {
      htmlElement.classList.remove(...classes);
      return;
    }
    htmlElement.classList.add(...classes);
  }

  protected ableToDisplayValidationMessages(ngControl: AbstractControl | NgControl | null): boolean {

    if (!ngControl) {
      return false;
    }

    if (!ngControl) {
      return false;
    }

    if (this._visibilityHandler) {
      return this._visibilityHandler(ngControl) || false;
    }

    const ableToDisplay = ngControl.invalid && (ngControl.dirty || ngControl.touched) === true;
    return true === ableToDisplay;
  }

  protected abstract getValidationClasses(): string[];

  //#endregion
}
