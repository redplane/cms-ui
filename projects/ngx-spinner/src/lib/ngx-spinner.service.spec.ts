import { TestBed } from '@angular/core/testing';

import { NgxSpinnerService } from './ngx-spinner.service';

describe('NgxSpinnerService', () => {
  let service: NgxSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
