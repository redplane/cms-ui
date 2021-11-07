import {Directive, Inject, Injector, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControlDirective, FormControlName, NgControl, NgModel} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {COMMON_VALIDATOR_SERVICE} from '../../../../constants';
import {IValidationSummarizerService} from '../../../../services';

@Directive({
  selector: '[validation-summarizer-control-watch][formControl], [validation-summarizer-control-watch][formControlName], [validation-summarizer-control-watch][ngModel]'
})
export class ValidatorControlWatchDirective implements OnInit, OnDestroy {

  //#region Properties

  // Watch instance status change subscription.
  private _watchedInstanceStatusChangesSubscription: Subscription;

  // Abstract control to be validated.
  private _control: AbstractControl | null;

  //#endregion

  //#region Accessors

  @Input('validation-summarizer-control-watch')
  public set watchedInstance(value: AbstractControl | NgControl) {
    this._watchedInstanceStatusChangesSubscription?.unsubscribe();

    let valueChangedObservable: Observable<any> | null = null;
    if (value instanceof AbstractControl) {
      valueChangedObservable = (value as AbstractControl).valueChanges;
    } else if (value instanceof NgControl) {
      valueChangedObservable = (value as NgControl).valueChanges;
    }

    if (valueChangedObservable) {
      this._watchedInstanceStatusChangesSubscription = valueChangedObservable
        .subscribe(() => {
          this.doValidation();
        });
    }
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(COMMON_VALIDATOR_SERVICE)
                     protected readonly validationSummarizerService: IValidationSummarizerService,
                     protected readonly ngControl: NgControl,
                     protected readonly injector: Injector) {
    this._watchedInstanceStatusChangesSubscription = new Subscription();
    this._control = null;
  }

  //#endregion

  //#region Life cycle hook

  public ngOnInit(): void {

    if (this.ngControl instanceof FormControlName) {
      this._control = (this.ngControl as FormControlName).control;
    } else if (this.ngControl instanceof FormControlDirective) {
      this._control = (this.ngControl as FormControlDirective).control;
    } else if (this.ngControl instanceof NgModel) {
      this._control = (this.ngControl as NgModel).control;
    }
  }

  public ngOnDestroy(): void {
    this._watchedInstanceStatusChangesSubscription?.unsubscribe();
  }

  //#endregion

  //#region Internal methods

  protected doValidation(): void {
    if (!this._control) {
      return;
    }

    this.validationSummarizerService.doControlValidation(this._control);
  }

  //#endregion
}
