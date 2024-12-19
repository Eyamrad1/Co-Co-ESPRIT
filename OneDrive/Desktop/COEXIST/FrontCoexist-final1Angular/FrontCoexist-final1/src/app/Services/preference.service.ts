import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Preference} from "../entity/Preference";

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }
  addPreference(preference: Preference): Observable<Preference> {
    return this.http.post<Preference>(`${this.baseUrl}/addPreference`, preference);

  }

  getAllPreferences(): Observable<Preference[]>{
    //return this.http.get<Carpooling[]>(this.baseUrl + 'getAllCarpooling');
    return this.http.get<Preference[]>(this.baseUrl+'getAllPreferance');
  }}
