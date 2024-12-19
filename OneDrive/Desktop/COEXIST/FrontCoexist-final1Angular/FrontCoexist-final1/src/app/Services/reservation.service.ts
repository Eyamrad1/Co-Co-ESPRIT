import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = 'http://localhost:8000'; // Update with your backend URL

  constructor(private http: HttpClient) { }
  createReservation(userId: number, eventId: number, numberOfTickets: number, cardNumber: string, cardHolderName: string, expirationDate: string, cvv: string): Observable<any> {
    const url = `${this.baseUrl}/createReservation`;

    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('eventId', eventId.toString())
      .set('numberOfTickets', numberOfTickets.toString())
      .set('cardNumber', cardNumber)
      .set('cardHolderName', cardHolderName)
      .set('expirationDate', expirationDate)
      .set('cvv', cvv);

    return this.http.post<any>(url, {}, { params });
  }
  getAllEventBookings(): Observable<any> {
    const url = `${this.baseUrl}/getAllEventBookings`;
    return this.http.get<any>(url);
  }

  deleteEventBooking(bookingEventId: number): Observable<any> {
    const url = `${this.baseUrl}/deleteEventBooking/${bookingEventId}`;
    return this.http.delete<any>(url);
  }
}
