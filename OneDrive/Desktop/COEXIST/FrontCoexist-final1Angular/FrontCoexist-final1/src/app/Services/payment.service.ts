import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:8000/api/v1/orders';

  constructor(private http: HttpClient) {}

  checkout(userId: string, access_token: string, paymentMethodId: string) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + access_token
    });

    return this.http.post(`${this.apiUrl}/${userId}/checkout`, { paymentMethodId }, { headers });
  }
}
