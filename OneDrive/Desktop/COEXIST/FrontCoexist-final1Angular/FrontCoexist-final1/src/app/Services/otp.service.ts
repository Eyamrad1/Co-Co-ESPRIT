import { Injectable } from '@angular/core';
import {OTP} from "../entity/OTP";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  private otpUrl = 'http://localhost:8000/COEXIST';
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  generateOTP(): Observable<OTP> {
    return this.http.post<OTP>(`${this.otpUrl}/OTP/GenerateOTp`, {});
  }
  verifyOTP(identification: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.otpUrl}/OTP/VerifierOTP/${identification}`, {}).pipe(
      map(response => {
        if (response) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
  getOTPbyId(){}
  resendOTP(existingOTP: OTP): Observable<OTP> {
    return this.http.post<OTP>(`${this.otpUrl}/OTP/ResendOTP`, existingOTP);
  }
}
