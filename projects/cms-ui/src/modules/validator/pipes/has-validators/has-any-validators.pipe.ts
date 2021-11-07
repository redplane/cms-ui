import {ChangeDetectorRef, Inject, OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AbstractControl, NgControl, NgModel} from '@angular/forms';
import {HAS_ANY_VALIDATOR_SERVICE} from '../../../../constants/injectors/internal-injectors';
import {ValidationSummarizerBaseService} from '../../../../services/implementations/validators/validation-summarizers/validation-summarizer-base.service';

@Pipe({
  name: 'hasValidators',
  pure: false
})
export class HasAnyValidatorsPipe implements PipeTransform, OnDestroy {

  //#region Properties

  private _subscription: Subscription;

  //#endregion

  //#region Constructor

  public constructor(@Inject(HAS_ANY_VALIDATOR_SERVICE)
                     protected readonly hasValidatorService: ValidationSummarizerBaseService,
                     protected readonly changeDetectorRef: ChangeDetectorRef) {
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycle hook

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  //#endregion

  //#region Methods

  public transform(value: AbstractControl | NgControl | NgModel, [validatorName]: [string | string[]]): boolean {

    // Validator name is invalid.
    if (validatorName === null || validatorName === undefined) {
      return false;
    }

    let validatorNames = [];
    if (typeof (validatorName) === 'string') {
      if (validatorName.trim().length < 1) {
        return false;
      }

      validatorNames = [validatorName];
    } else {
      validatorNames = (validatorName as unknown as string[])
        .filter(x => x !== null && x !== undefined && x.trim().length > 0);
    }

    if (!validatorNames || !validatorNames.length) {
      return false;
    }

    let statusChangesObservable: Observable<any> | null = null;
    if (value instanceof NgControl) {
      statusChangesObservable = (value as NgControl).statusChanges;
    } else if (value instanceof NgModel) {
      statusChangesObservable = (value as NgModel).statusChanges;
    } else if (value instanceof AbstractControl) {
      statusChangesObservable = (value as AbstractControl).statusChanges;
    }


    if (!statusChangesObservable) {
      return false;
    }

    const statusChangesSubscription = statusChangesObservable
      .subscribe(status => {
        if ('PENDING' === status) {
          return;
        }
        this.changeDetectorRef.markForCheck();
      });
    this._subscription.add(statusChangesSubscription);
    return validatorNames.findIndex(x => this.hasValidatorService.hasValidator(x, value)) > -1;
  }

  //#endregion
}
