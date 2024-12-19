import { TestBed } from '@angular/core/testing';

import { ColFeedbackService } from './col-feedback.service';

describe('ColFeedbackService', () => {
  let service: ColFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
