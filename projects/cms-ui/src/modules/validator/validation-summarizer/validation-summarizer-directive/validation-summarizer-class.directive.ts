import {ChangeDetectorRef, Directive, ElementRef, Inject, Input} from '@angular/core';
import {AbstractControl, NgControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {VALIDATION_SUMMARIZER_OPTION_PROVIDER, VALIDATION_SUMMARIZER_PROVIDER} from '../../../../constants';
import {IValidationSummarizerService} from '../../../../services';
import {ValidationSummarizerClassBase} from './validation-summarizer-class-base';
import {IValidationSummarizerOptionProvider} from '../../../../providers';

@Directive({
  selector: '[validation-summarizer-class]:not([formControl]):not([ngModel]):not([formControlName])'
})
export class ValidationSummarizerClassDirective extends ValidationSummarizerClassBase {

  //#region Properties

  //#endregion

  //#region Accessors

  // Instance to validate.
  @Input('instance')
  public set instance(control: AbstractControl | NgControl | null) {

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

  @Input('validation-summarizer-class')
  public set classes(value: string[] | string | null) {
    super.classes = value || [];
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(VALIDATION_SUMMARIZER_PROVIDER)
                     protected readonly validationSummarizerService: IValidationSummarizerService,
                     @Inject(VALIDATION_SUMMARIZER_OPTION_PROVIDER)
                     protected readonly validationSummarizerOptionProvider: IValidationSummarizerOptionProvider,
                     protected readonly changeDetectorRef: ChangeDetectorRef,
                     protected readonly elementRef: ElementRef) {
    super(validationSummarizerService, changeDetectorRef, elementRef);
  }

  //#endregion

  //#region Methods

  protected getValidationClasses(): string[] {
    if (this._classes && this._classes.length) {
      return this._classes;
    }

    return this.validationSummarizerOptionProvider
      .getOption().defaultValidationClasses || [];
  }

  //#endregion
}
