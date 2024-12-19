import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CollocationBooking} from "../entity/CollocationBooking";

@Injectable({
  providedIn: 'root'
})
export class CollocationBookingService {
  readonly Get_CollocationBooking = 'http://localhost:8000/AnnonceBooking/get_all_CollocationBookings';
  readonly Get_CollocationBooking_ByUser = 'http://localhost:8000/AnnonceBooking/booking';
  readonly Get_CollocationBooking_ByAnnId = 'http://localhost:8000/AnnonceBooking/booking';
  readonly ADD_CollocationBooking = 'http://localhost:8000/AnnonceBooking/add';
  readonly DeleteCollocationBooking_CollocationBooking = 'http://localhost:8000/AnnonceBooking/deleteCollocationBooking/';
  readonly UPDATE_STATUS_TYPE_URL = 'http://localhost:8000/AnnonceBooking/updateStatusType/';


  constructor(private httpClient: HttpClient) {
  }
  getAllCollocationBookings() {
    return this.httpClient.get<CollocationBooking>(this.Get_CollocationBooking);
  }
  getCollocationBookingsById(id:Number) {
    return this.httpClient.get<CollocationBooking>(this.Get_CollocationBooking_ByUser+"/"+id);
  }
  getCollocationBookingsByAnnId(id:Number, annId:any) {
    return this.httpClient.get<CollocationBooking>(this.Get_CollocationBooking_ByAnnId+"/"+id+ "/" + annId);
  }
  public addCollocationBooking(collocationBooking: CollocationBooking, userId:Number): Observable<CollocationBooking> {
    return this.httpClient.post<CollocationBooking>(this.ADD_CollocationBooking+"/" +userId, collocationBooking);
  }
  public deleteCollocationBooking(id: number){
    return this.httpClient.delete(this.DeleteCollocationBooking_CollocationBooking+id);
  }
  public UpdateStatusTypeCollocationBookings(id: number, userId:any, collocationBooking: CollocationBooking): Observable<CollocationBooking> {
    return this.httpClient.post<CollocationBooking>(this.UPDATE_STATUS_TYPE_URL+id+"/"+userId, collocationBooking);
  }
}
