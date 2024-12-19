import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AnnouncementCollocation} from "../entity/AnnouncementCollocation";
import {Observable,catchError,throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementCollocationService {
  readonly Get_Announcement = 'http://localhost:8000/Announce/get_all_AnnoncementCollocations';
  readonly Get_Announcement_and_favoris_userID = 'http://localhost:8000/Announce/get_all_AnnoncementCollocations_andfavoris';
  readonly Get_Announcement_by_userID = 'http://localhost:8000/Announce/get_AnnoncementCollocations';
  readonly ADD_Announcement = 'http://localhost:8000/Announce/add-AnnoncementCollocation';
  readonly DeleteAnnouncement_Announcement = 'http://localhost:8000/Announce/deleteAnnoncementCollocation/';
  readonly Get_AnnouncementById ='http://localhost:8000/Announce/get_AnnoncementById/'
  readonly UPDATE_Announcement = 'http://localhost:8000/Announce/updateAnnoncementCollocation';
  readonly URL = 'http://localhost:8000/Announce';

  constructor(private httpClient: HttpClient) {
  }
  getAnnouncementById(id: number): Observable<AnnouncementCollocation> {
    return this.httpClient.get<AnnouncementCollocation>(this.Get_AnnouncementById+id)

  }
  getAnnouncementByIdAndUser(id: any, userId: any): Observable<AnnouncementCollocation> {
    return this.httpClient.get<AnnouncementCollocation>(this.Get_AnnouncementById+id+"/"+ userId)

  }
  getAllAnnouncements() {
    return this.httpClient.get<AnnouncementCollocation>(this.Get_Announcement);
  }
  getArchivedAnnouncementsByUserId(userId:any) {
    return this.httpClient.get<AnnouncementCollocation>(`http://localhost:8000/Announce/archived/${userId}`);
  }
  getAllAnnouncementsAndFavorisByUserId(userId:Number) {
    return this.httpClient.get<AnnouncementCollocation>(this.Get_Announcement_and_favoris_userID +"/"+userId);
  }
  getAnnouncementsByUserId(userId:Number) {
    return this.httpClient.get<AnnouncementCollocation>(this.Get_Announcement_by_userID +"/"+userId);
  }
  public addAnnouncement(data: any, userId: Number) {
    return this.httpClient.post(this.ADD_Announcement +"/"+ userId, data);
  }
  public deleteAnnouncement(id: number){
    return this.httpClient.delete(this.DeleteAnnouncement_Announcement+id);
  }
  public updateAnnouncement(announcementCollocation: any, id:any) {
    console.log("🚀 ~ AnnouncementCollocationService ~ updateAnnouncement ~ announcementCollocation:", announcementCollocation)
    const url = `${this.UPDATE_Announcement}/${id}`; // Assuming `id` is a property of AnnouncementCollocation
    return this.httpClient.put(url, announcementCollocation);
  }
  public archiveAnnouncement(announcementCollocationId: number, id:number): Observable<any>  {
     return this.httpClient.post(`http://localhost:8000/Announce/${announcementCollocationId}/${id}/archive`,{});
  }
  public unarchiveAnnouncement(announcementCollocationId: number, id:number):Observable<any> {
     return this.httpClient.post(`http://localhost:8000/Announce/${announcementCollocationId}/${id}/unarchive`,{});
  }
  applyFilters(filters: any, userId:any): Observable<any[]> {
    let params = new HttpParams();
    // Iterate through filters object and append to params
    Object.keys(filters).forEach(key => {
      if (filters[key] !== '') {
        params = params.append(key, filters[key]);
      }
    });
    // Make HTTP request to your backend API
    return this.httpClient.get<any[]>(`${this.URL}/annoncementCollocation/filter/`+userId, { params: params });
  }
}
