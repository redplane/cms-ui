import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationSummarizerService} from './validation-summarizer.service';
import {IValidationSummarizerService} from '../../../interfaces';
import {ValidationSummarizerOptionProvider} from '../../../../providers/implementations/validation-summarizer-option.provider';
import {ValidationSummarizerModule} from '../../../../modules/validator/validation-summarizer/validation-summarizer.module';
import {VALIDATION_SUMMARIZER_SERVICE} from '../../../../constants/injectors/validation-summarizer-injectors';

export class BasicValidationSummarizerService extends ValidationSummarizerService {
  // TODO: Implement this.
  public constructor() {
    super(new ValidationSummarizerOptionProvider([]));
  }
}

export function validationSummarizerFactory(): IValidationSummarizerService {
  return new BasicValidationSummarizerService();
}

describe('ValidationSummarizerService', () => {

  //#region Properties

  let subscription: Subscription | null = null;

  //#endregion

  //#region Methods

  beforeEach(async () => {

    subscription = new Subscription();

    await TestBed.configureTestingModule({
      imports: [ValidationSummarizerModule],
      providers: [
        {
          provide: VALIDATION_SUMMARIZER_SERVICE,
          useFactory: validationSummarizerFactory
        }
      ]
    })
      .compileComponents();
  });

  afterEach(() => {
    if (subscription && !subscription.closed) {
      subscription.unsubscribe();
    }
  });

  //#endregion

  //#region Methods

  it('Do validation do not trigger control\'s valueChanged event ', fakeAsync(() => {

    const nameControl = new FormControl(null, [Validators.required]);
    const descriptionControl = new FormControl(null);
    const studentFormGroup = new FormGroup({
      name: nameControl,
      description: descriptionControl
    });

    let hasValueChanged = false;
    const nameControlValueChangedSubscription = nameControl.valueChanges
      .subscribe(value => {
        hasValueChanged = true;
      });
    subscription?.add(nameControlValueChangedSubscription);

    const validationSummarizerService = TestBed.inject(VALIDATION_SUMMARIZER_SERVICE);
    validationSummarizerService
      .doFormControlsValidation(studentFormGroup);

    tick(5000);
    console.log(nameControl.errors);
    expect(hasValueChanged).toEqual(false);
    expect(nameControl.hasError('required')).toEqual(true);
  }));

  //#endregion
});
