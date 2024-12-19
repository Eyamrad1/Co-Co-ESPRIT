import { Injectable } from '@angular/core';
import {FeedBack} from "../entity/FeedBack";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ColFeedbackService {

  private baseUrl:string='http://localhost:8000/AnnonceFeedBack'
  constructor(private http:HttpClient) { }

  addFeedback(feedBack: FeedBack, id:any): Observable<FeedBack> {
    // Use the correct HTTP method (e.g., POST) and endpoint for adding feedback
    // Adjust the endpoint according to your API

    return this.http.post<FeedBack>(this.baseUrl + '/collocations/'+ id +'/feedback', feedBack);

  }
  getFeedbackByCollocationBookingId(id:any): Observable<FeedBack> {
    return this.http.get<FeedBack>(this.baseUrl + '/feedback/'+ id  );
  }

}
