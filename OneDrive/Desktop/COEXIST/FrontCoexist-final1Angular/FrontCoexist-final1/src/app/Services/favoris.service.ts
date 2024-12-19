import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AnnouncementCollocation } from "../entity/AnnouncementCollocation";

@Injectable({
  providedIn: 'root'
})
export class FavorisService {

  readonly Add = 'http://localhost:8000/Announce/addAnnoceCollToFAVORIS/';
  readonly Get = 'http://localhost:8000/Announce/all'
  readonly GetByUserId = 'http://localhost:8000/Announce/annoncements/favoris/'
  readonly GetByid = 'http://localhost:8000/Announce/get_AnnoncementById/'
  constructor(private http: HttpClient) { }

  getFavoris(): Observable<AnnouncementCollocation[]> {
    return this.http.get<AnnouncementCollocation[]>(this.Get )
      .pipe(
        catchError((error) => {
          console.error('Error fetching favoris:', error);
          return throwError(error); // Return an observable error
        })
      );
  }

  getFavorisByUserId(userId:Number): Observable<AnnouncementCollocation[]> {
    return this.http.get<AnnouncementCollocation[]>(this.GetByUserId + userId)
      .pipe(
        catchError((error) => {
          console.error('Error fetching favoris:', error);
          return throwError(error); // Return an observable error
        })
      );
  }



  getAnnouncementById(id: number): Observable<AnnouncementCollocation> {
    return this.http.get<AnnouncementCollocation>(this.GetByid + id);
  }

  addAnnoucementFavoris(userId: number, annId: number): Observable<String> {
    return this.http.post<any>(this.Add + userId + '/' + annId, {});
  }
  removeAnnouncementFromFavoris(userId: number, annId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8000/Announce/removeAnnoceCollFromFAVORIS/${userId}/${annId}`);
  }

  updateFavorisStatus(userId: number, annId: number, favoris: boolean): Observable<any> {
    return this.http.put<any>(`/updateFavorisStatus/${userId}/${annId}?favoris=${favoris}`, {});
  }

  removeFavoris(announcementId: number): Observable<any> {
    return this.http.delete(`http://localhost:8000/Announce/api/favoris/${announcementId}`)
  }
}
