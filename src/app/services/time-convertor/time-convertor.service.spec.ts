import { TestBed } from '@angular/core/testing';

import { TimeConvertorService } from './time-convertor.service';

describe('TimeConvertorService', () => {
  let service: TimeConvertorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeConvertorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
