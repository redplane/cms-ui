import {ChangeDetectorRef, Directive, ElementRef, Inject, Input} from '@angular/core';
import {AbstractControl, NgControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {COMMON_VALIDATOR_OPTIONS_PROVIDER, COMMON_VALIDATOR_SERVICE} from '../../../../constants/injectors/common-validator-injectors';
import {IValidationSummarizerService} from '../../../../services/interfaces/validation-summarizers/validation-summarizer-service.interface';
import {ValidatorClassBase} from './validator-class-base';
import {IValidationSummarizerOptionProvider} from '../../../../providers/interfaces/validation-summarizer-options-provider.interface';

@Directive({
  selector: '[validation-summarizer-class]:not([formControl]):not([ngModel]):not([formControlName])'
})
export class ValidatorClassDirective extends ValidatorClassBase {

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

  public constructor(@Inject(COMMON_VALIDATOR_SERVICE)
                     protected readonly validationSummarizerService: IValidationSummarizerService,
                     @Inject(COMMON_VALIDATOR_OPTIONS_PROVIDER)
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
