import {ChangeDetectorRef, Directive, ElementRef, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControlDirective, FormControlName, NgControl, NgModel} from '@angular/forms';
import {Observable} from 'rxjs';
import {VALIDATION_SUMMARIZER_OPTION_PROVIDER, VALIDATION_SUMMARIZER_PROVIDER} from '../../../../constants';
import {IValidationSummarizerService} from '../../../../services';
import {ValidationSummarizerClassBase} from './validation-summarizer-class-base';
import {IValidationSummarizerOptionProvider} from '../../../../providers';

@Directive({
  selector: '[validation-summarizer-class][ngModel], [validation-summarizer-class][formControl], [validation-summarizer-class][formControlName]'
})
export class ValidationSummarizerControlClassDirective extends ValidationSummarizerClassBase implements OnInit, OnDestroy {

  //#region Properties

  //#endregion

  //#region Accessors

  @Input('validation-summarizer-class')
  public set classes(value: string[] | string) {
    super.classes = value;
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(VALIDATION_SUMMARIZER_PROVIDER)
                     protected readonly validationSummarizerService: IValidationSummarizerService,
                     @Inject(VALIDATION_SUMMARIZER_OPTION_PROVIDER)
                     protected readonly validationSummarizerOptionProvider: IValidationSummarizerOptionProvider,
                     protected readonly changeDetectorRef: ChangeDetectorRef,
                     protected readonly elementRef: ElementRef,
                     protected readonly ngControl: NgControl) {
    super(validationSummarizerService, changeDetectorRef, elementRef);
  }

  //#endregion

  //#region Methods

  public ngOnInit(): void {

    if (this.ngControl instanceof FormControlName) {
      this._control = (this.ngControl as FormControlName).control;
    } else if (this.ngControl instanceof FormControlDirective) {
      this._control = (this.ngControl as FormControlDirective).control;
    } else if (this.ngControl instanceof NgModel) {
      this._control = (this.ngControl as NgModel).control;
    }

    if (this._control) {
      this.hookControlStatusChanges(this._control);
    }
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  //#endregion

  //#region Methods

  protected hookControlStatusChanges(control: NgControl | AbstractControl): void {

    // Unsubscribe the previous subscription.
    this._hookStatusChangesSubscription?.unsubscribe();
    this._control = control;

    let statusChangesObservable: Observable<any> | null = null;
    if (control instanceof AbstractControl) {
      statusChangesObservable = control.statusChanges;
    } else if (control instanceof NgControl) {
      statusChangesObservable = control.statusChanges;
    }

    this._hookStatusChangesSubscription = statusChangesObservable?.subscribe(() => {
      this.buildElementClasses(control);
    });
  }

  protected getValidationClasses(): string[] {
    if (this._classes && this._classes.length) {
      return this._classes;
    }

    return this.validationSummarizerOptionProvider
      .getOption().defaultControlValidationClasses || [];
  }

  //#endregion

}
