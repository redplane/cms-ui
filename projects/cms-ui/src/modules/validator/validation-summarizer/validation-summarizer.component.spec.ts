import {TestBed} from '@angular/core/testing';
import {ValidationSummarizerComponent} from './validation-summarizer.component';
import {Subscription} from 'rxjs';
import {ValidationSummarizerModule} from './validation-summarizer.module';
import {IValidationSummarizerService, ValidationSummarizerService} from '../../../services';
import {Inject, Injectable} from '@angular/core';
import {VALIDATION_SUMMARIZER_OPTIONS} from '../../../constants';
import {IValidationSummarizerOptionProvider} from '../../../providers';

@Injectable()
export class BasicValidationSummarizerService
  extends ValidationSummarizerService implements IValidationSummarizerService {

  //#region Constructor

  public constructor(
    @Inject(VALIDATION_SUMMARIZER_OPTIONS) validationSummarizerOptionProvider: IValidationSummarizerOptionProvider) {
    super(validationSummarizerOptionProvider);
  }

  //#endregion
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
        ValidationSummarizerModule.forRoot({})
      ],
      providers: []
    })
      .compileComponents();
  });

  afterEach(() => {
    subscription?.unsubscribe();
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
