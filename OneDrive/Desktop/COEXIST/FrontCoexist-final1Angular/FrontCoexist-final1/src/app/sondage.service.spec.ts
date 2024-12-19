import { TestBed } from '@angular/core/testing';

import { SondageService } from './sondage.service';

describe('SondageService', () => {
  let service: SondageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SondageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
