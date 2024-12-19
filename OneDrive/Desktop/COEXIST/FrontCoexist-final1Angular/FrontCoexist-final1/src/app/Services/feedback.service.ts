import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FeedBack} from "../entity/FeedBack";


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl:string='http://localhost:8000'
  constructor(private http:HttpClient) { }

  addFeedback(feedBack: FeedBack, userId: number, bookingId: number): Observable<FeedBack> {
    return this.http.post<FeedBack>(`${this.baseUrl}/addFeedback/${userId}/${bookingId}`, feedBack);
  }

  getAllFeedback(): Observable<FeedBack[]> {
    return this.http.get<FeedBack[]>(`${this.baseUrl}/getAllFeedback`);
  }

  checkFeedbackStatus(userId: number): Observable<any> {
    const url = `${this.baseUrl}/checkFeedbackStatus/${userId}`;
    return this.http.get<any>(url);
  }

  deleteFeedback(feedBackId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delateFeedback/${feedBackId}`);
  }

}
