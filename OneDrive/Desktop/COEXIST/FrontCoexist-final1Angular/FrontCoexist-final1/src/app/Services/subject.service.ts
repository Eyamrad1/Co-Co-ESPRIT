import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "../entity/Subject";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  readonly Get_Subject = 'http://localhost:8000/get_all_Subjects';
  readonly ADD_Subject = 'http://localhost:8000/add-Subject';
  readonly DeleteSubject_Subject = 'http://localhost:8000/deleteSubject/';


  constructor(private httpClient: HttpClient) {
  }
  getAllSubjects() {
    return this.httpClient.get<Subject>(this.Get_Subject);
  }
  public addSubject(subject: Subject): Observable<Subject> {
    return this.httpClient.post<Subject>(this.ADD_Subject, subject);
  }
  public deleteSubject(id: number){
    return this.httpClient.delete(this.DeleteSubject_Subject+id);
  }
}
