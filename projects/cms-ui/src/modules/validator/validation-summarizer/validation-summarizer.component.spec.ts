import {TestBed} from '@angular/core/testing';
import {ValidationSummarizerComponent} from '@cms-ui/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

describe('ValidationSummarizerComponent', () => {

  //#region Properties

  let subscription: Subscription | null = null;

  //#endregion

  //#region Methods

  beforeEach(async () => {

    subscription = new Subscription();

    await TestBed.configureTestingModule({
      imports: [],
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
