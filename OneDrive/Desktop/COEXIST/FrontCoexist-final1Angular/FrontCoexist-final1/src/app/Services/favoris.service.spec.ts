import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FavorisService } from './favoris.service';

describe('FavorisService', () => {
  let service: FavorisService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FavorisService]
    });
    service = TestBed.inject(FavorisService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add announcement to favoris', () => {
    const userId = 1;
    const annId = 123;

    service.addAnnouncementToFavoris(userId, annId).subscribe(
      (data) => {
        expect(data).toBeTruthy();
      },
      (error) => {
        fail('Should not have errored');
      }
    );

    const req = httpMock.expectOne(`/addAnnoceCollToFAVORIS/${userId}/${annId}`);
    expect(req.request.method).toBe('POST');
    req.flush({}); // Mock successful response
  });

  it('should update favoris status', () => {
    const userId = 1;
    const annId = 123;
    const favoris = true;

    service.updateFavorisStatus(userId, annId, favoris).subscribe(
      (data) => {
        expect(data).toBeTruthy();
      },
      (error) => {
        fail('Should not have errored');
      }
    );

    const req = httpMock.expectOne(`/updateFavorisStatus/${userId}/${annId}?favoris=${favoris}`);
    expect(req.request.method).toBe('PUT');
    req.flush({}); // Mock successful response
  });
});
