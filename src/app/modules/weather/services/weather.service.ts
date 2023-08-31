import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IWeatherRes } from "src/app/interfaces/IWeatherRes";

@Injectable({
  providedIn: "root",
})
export class WeatherService {
  private apiKey = "439d4b804bc8187953eb36d2a8c26a02";
  private url = `https://openweathermap.org/data/2.5/onecall`;

  constructor(private http: HttpClient) {}

  getWeather(lat: number, lon: number): Observable<IWeatherRes> {
    return this.http.get<IWeatherRes>(
      `${this.url}?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`
    );
  }
}
