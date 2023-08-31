import { Component } from "@angular/core";
import { WeatherService } from "../services/weather.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Current } from "src/app/interfaces/IWeatherRes";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
})
export class WeatherComponent {
  loading = false;
  error = "";
  lat = 0;
  lon = 0;
  place = "";
  weather: Current[] = [];

  constructor(private weatherService: WeatherService) {}

  onSubmit() {
    this.loading = true;
    this.place = "";
    this.error = "";
    this.weatherService.getWeather(this.lat, this.lon).subscribe({
      next: (response) => {
        this.place = response.timezone;
        this.weather = response.hourly.slice(0, 6);
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.error = `Code: ${error.status} Error: ${error.statusText}`;
        this.loading = false;
        this.place = "";
      },
    });
  }

  getDate(fecha: number) {
    return new Date(fecha * 1000).toLocaleString();
  }
}
