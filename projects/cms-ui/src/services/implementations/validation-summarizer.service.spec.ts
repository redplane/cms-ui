import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {builtInValidationMessages, VALIDATION_SUMMARIZER_PROVIDER} from '../../constants';
import {ValidationSummarizerService} from './validation-summarizer.service';
import {ValidationSummarizerModule} from '../../modules';
import {IValidationSummarizerService} from '../interfaces';
import {ValidationSummarizerOptionProvider} from '../../providers';

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
          provide: VALIDATION_SUMMARIZER_PROVIDER,
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

    const validationSummarizerService = TestBed.inject(VALIDATION_SUMMARIZER_PROVIDER);
    validationSummarizerService
      .doFormControlsValidation(studentFormGroup);

    tick(5000);
    console.log(nameControl.errors);
    expect(hasValueChanged).toEqual(false);
    expect(nameControl.hasError('required')).toEqual(true);
  }));

  //#endregion
});
