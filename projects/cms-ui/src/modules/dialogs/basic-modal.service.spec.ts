import { TestBed, inject } from '@angular/core/testing';

import { BasicModalService } from './basic-modal.service';

describe('BasicModalService', () => {
  let service: BasicModalService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasicModalService]
    });
    service = new BasicModalService(null);
  });

  it('should be created', (done: DoneFn) => {
    expect(service).toBeTruthy();
    done();
  });
});
