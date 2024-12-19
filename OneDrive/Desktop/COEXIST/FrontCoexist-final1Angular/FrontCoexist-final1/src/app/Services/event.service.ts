import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, tap, throwError} from "rxjs";
import { Event } from '../entity/Event';
import {LikedEvents} from "../entity/LikedEvents";


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8000';
  imageBaseUrl = 'http://localhost:8000/'

  constructor(private http: HttpClient) {}

  addEvent(eventData: FormData): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/add-event`, eventData);
  }

  shareEventOnFacebook(eventId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${eventId}/share-fb`, null);
  }





  updateEvent(event: Event, eventId: number): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/updateEvent/${eventId}`, event);
  }


  getEvent(eventId: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/findByIdEvent/${eventId}`);
  }


  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/retrieveAllEvents`);
  }





  searchEventsByDate(eventDate: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/search/date?eventDate=${eventDate}`);
  }

  searchEventsByDescription(eventDescription: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/search/description?eventDescription=${eventDescription}`);
  }

  searchEventsByLocation(eventLocation: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/search/location?eventLocation=${eventLocation}`);
  }







  getImageUrl(imagePath: string): string {
    return this.imageBaseUrl + imagePath;
  }



  addOrUpdateReaction(eventId: number, userId: number, isLiked: boolean): Observable<any> {
    const url = `${this.apiUrl}/events/${eventId}/reaction`;

    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('eventId', eventId.toString())
      .set('isLiked', isLiked.toString()); // Convert boolean to string

    return this.http.put<any>(url, {}, { params });
  }


  deleteEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteEventById/${eventId}`);
  }

  searchEvents(keyword: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/recherche/${keyword}`);
  }
}
