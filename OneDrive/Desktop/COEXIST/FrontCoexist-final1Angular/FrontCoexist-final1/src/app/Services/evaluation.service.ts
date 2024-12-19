import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Evaluation} from "../entity/Evaluation";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private baseUrl = 'http://localhost:8000';  // Update the base URL based on your Spring Boot application's server address

  constructor(private http: HttpClient) { }

  addEvaluationAndAssignToEvent(userId: number, evaluation: Evaluation, eventId: number): Observable<Evaluation> {
    // Make sure the URL or the method includes eventId
    return this.http.post<Evaluation>(`${this.baseUrl}/addEvaluationAndAssignToEvent/${eventId}/${userId}`, evaluation);
  }


  /*deleteEvaluationById(IdEvaluation: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteEvaluationById/${IdEvaluation}`);
  }*/
  deleteEvaluation(IdEvaluation: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteEvaluationById/${IdEvaluation}`);
  }


  updateEvaluation(evaluation: Evaluation, IdEvaluation: number): Observable<Evaluation> {
    return this.http.put<Evaluation>(`${this.baseUrl}/updateEvaluation/${IdEvaluation}`, evaluation);
  }
  Getchartinfo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/StatEvaluation`);
  }


  retrieveAllEvaluation(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(`${this.baseUrl}/retrieveAllEvaluation`);
  }
}
