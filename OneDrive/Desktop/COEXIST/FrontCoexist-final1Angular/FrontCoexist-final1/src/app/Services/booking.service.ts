import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Carpooling} from "../entity/Carpooling";
import {Observable} from "rxjs";
import {Booking} from "../entity/Booking";
import * as Twilio from 'twilio';

@Injectable({
  providedIn: 'root'
})
export class BookingService {


  private baseUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }
  addBooking(booking: Booking, carpoolingID: number, userId: number): Observable<Booking> {
    const url = `${this.baseUrl}addBooking/${carpoolingID}/${userId}`;
    return this.http.post<Booking>(url, booking);
  }
  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl + 'getALLBooking');
  }


  deleteBooking(bookingId: number): Observable<void> {
    const url = `${this.baseUrl}deleteBooking/${bookingId}`;
    return this.http.delete<void>(url);
  }

  getBookingByBookingID(bookingID: number): Observable<Booking> {
    const url = `${this.baseUrl}${bookingID}`;
    return this.http.get<Booking>(url);
  }
  getCarpoolingForBooking(bookingID: number): Observable<Carpooling> {
    const url = `${this.baseUrl}carpooling/${bookingID}`;
    return this.http.get<Carpooling>(url);
  }
}

