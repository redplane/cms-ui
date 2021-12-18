import {TestBed} from '@angular/core/testing';
import {ValidationSummarizerComponent} from './validation-summarizer.component';
import {Subscription} from 'rxjs';
import {ValidationSummarizerModule} from './validation-summarizer.module';

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
