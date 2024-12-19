import { TestBed } from '@angular/core/testing';

import { AnnouncementCollocationService } from './announcement-collocation.service';

describe('AnnouncementCollocationService', () => {
  let service: AnnouncementCollocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnouncementCollocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
