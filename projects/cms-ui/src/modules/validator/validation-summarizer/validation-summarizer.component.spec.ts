import {TestBed} from '@angular/core/testing';
import {ValidationSummarizerComponent} from './validation-summarizer.component';
import {Subscription} from 'rxjs';
import {ValidationSummarizerModule} from './validation-summarizer.module';
import {IValidationSummarizerService, ValidationSummarizerService} from '../../../services';
import {Inject, Injectable} from '@angular/core';
import {VALIDATION_SUMMARIZER_OPTION_PROVIDER} from '../../../constants';
import {IValidationSummarizerOptionProvider} from '../../../providers';

@Injectable()
export class BasicValidationSummarizerService
  extends ValidationSummarizerService implements IValidationSummarizerService {

  public constructor(
    @Inject(VALIDATION_SUMMARIZER_OPTION_PROVIDER) validationSummarizerOptionProvider: IValidationSummarizerOptionProvider) {
    super(validationSummarizerOptionProvider);
  }
}

describe('ValidationSummarizerComponent', () => {

  //#region Properties

  let subscription: Subscription | null = null;

  //#endregion

  //#region Methods

  beforeEach(async () => {

    subscription = new Subscription();
    await TestBed.configureTestingModule({
      imports: [
        ValidationSummarizerModule.forRoot(BasicValidationSummarizerService, {})
      ],
      providers: []
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

  it('Component must be created when module is imported', () => {
    const fixture = TestBed.createComponent(ValidationSummarizerComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  //#endregion
});
