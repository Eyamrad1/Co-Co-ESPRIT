import { TestBed } from '@angular/core/testing';

import { FeedbackcService } from './feedbackc.service';

describe('FeedbackcService', () => {
  let service: FeedbackcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
