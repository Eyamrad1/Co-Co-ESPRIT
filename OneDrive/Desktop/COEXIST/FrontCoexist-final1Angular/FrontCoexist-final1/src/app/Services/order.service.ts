import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8000/orders';

  constructor(private http: HttpClient) {}

  getOrdersByUserId(userId: string, access_token: string) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + access_token
    });

    return this.http.get(`${this.apiUrl}/${userId}`, { headers });
  }
}
