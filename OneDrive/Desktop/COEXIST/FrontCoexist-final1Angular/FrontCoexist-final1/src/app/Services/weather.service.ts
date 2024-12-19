import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'c5a59a29ec0d9b60251d7d7922ac3544'; // Your actual OpenWeatherMap API key
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather'; // OpenWeatherMap API endpoint

  constructor(private http: HttpClient) {}

  getWeatherForecast(location: string, date: string): Observable<any> {
    // Construct the API URL with query parameters
    const url = `${this.apiUrl}?q=${location}&date=${date}&appid=${this.apiKey}`;

    // Make the HTTP GET request and return the Observable
    return this.http.get<any>(url);
  }

  getWeatherIconUrl(iconCode: string): string {
    // Map the weather icon code to the corresponding URL
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  formatDate(date: Date): string {
    // Format the date to 'yyyy-MM-dd' format (e.g., '2024-04-27')
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Month is zero-indexed
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}

