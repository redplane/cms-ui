import {TestBed, inject} from '@angular/core/testing';
import {TranslatedValidationSummarizerService} from './translated-validation-summarizer.service';

describe('DefaultControlValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslatedValidationSummarizerService]
    });
  });

  it('should be created', inject([TranslatedValidationSummarizerService], (service: TranslatedValidationSummarizerService) => {
    expect(service).toBeTruthy();
  }));
});
