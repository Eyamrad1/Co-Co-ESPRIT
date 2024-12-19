import { TestBed } from '@angular/core/testing';

import { CollocationBookingService } from './collocation-booking.service';

describe('CollocationBookingService', () => {
  let service: CollocationBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollocationBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
