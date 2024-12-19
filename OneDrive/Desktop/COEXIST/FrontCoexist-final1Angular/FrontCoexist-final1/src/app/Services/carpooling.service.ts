import {EventEmitter, Injectable} from '@angular/core';
import {FeedBack} from "../entity/FeedBack";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Carpooling} from "../entity/Carpooling";
import {Booking} from "../entity/Booking";
import {CarpoolingType} from "../entity/CarpoolingType";

@Injectable({
  providedIn: 'root'
})
export class CarpoolingService {
  private baseUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  addCarpooling(carpooling: any, userId: number): Observable<any> {
    const url = `${this.baseUrl}addCarpooling/${userId}`;
    return this.http.post(url, carpooling);
  }
  getAllCarpooling(): Observable<Carpooling[]> {
    return this.http.get<Carpooling[]>(this.baseUrl + 'getAllCarpooling');
  }
  addBooking(booking: Booking, carpoolingID: number): Observable<Booking> {
    // Adjust the endpoint according to your API
    return this.http.post<Booking>(`${this.baseUrl}addBooking/${carpoolingID}`, booking);}
  deleteCarpooling(carpoolingId: number): Observable<void> {
    const url = `${this.baseUrl}delateCarpooling/${carpoolingId}`;
    return this.http.delete<void>(url);
  }
  updateCarpooling(carpoolingID: number, carpooling: Carpooling): Observable<any> {
    return this.http.put(`${this.baseUrl}updateCarpooling/${carpoolingID}`, carpooling);
  }
  updateCarpoolinge(carpooling: Carpooling): Observable<Carpooling> {
    return this.http.put<Carpooling>(`${this.baseUrl}/updateCarpooling`, carpooling);
  }

  findCarpooling(carpoolingId: number): Observable<Carpooling> {
    return this.http.get<Carpooling>(`/findCarpooling/${carpoolingId}`);
  }
  findByCarpoolingType(carpoolingType: CarpoolingType): Observable<Carpooling[]> {
    const url = `${this.baseUrl}findByCarpoolingType/${carpoolingType}`;
    return this.http.get<Carpooling[]>(url);
  }
  findByDepartureTime(departureTime: string): Observable<Carpooling[]> {
    return this.http.get<Carpooling[]>(`${this.baseUrl}findByDepartureTime?departureTime=${departureTime}`);
  }
  findByDay(day: string): Observable<Carpooling[]> {
    return this.http.get<Carpooling[]>(`${this.baseUrl}findByDay/${day}`);
  }
  compareLastPreferenceAndLastCarpooling(): Observable<Carpooling> {
    return this.http.get<Carpooling>(this.baseUrl + 'compare');
  }
  matchingCarpoolingFound: EventEmitter<Carpooling | null> = new EventEmitter<Carpooling | null>();
  emitMatchingCarpooling(matchingCarpooling: Carpooling | null) {
    this.matchingCarpoolingFound.emit(matchingCarpooling);
  }
}
