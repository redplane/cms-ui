import { TestBed, inject } from '@angular/core/testing';

import { BasicValidationSummarizerService } from './basic-validation-summarizer.service';

describe('DefaultControlValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasicValidationSummarizerService]
    });
  });

  it('should be created', inject([BasicValidationSummarizerService], (service: BasicValidationSummarizerService) => {
    expect(service).toBeTruthy();
  }));
});
