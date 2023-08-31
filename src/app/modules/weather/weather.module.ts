import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WeatherComponent } from "./components/weather.component";
import { WeatherRoutingModule } from "./weather-routing.module";
import { InputModule } from "../../components/input/input.module";
import { FormsModule } from "@angular/forms";
import { LoaderModule } from "../../components/loader/loader.module";

@NgModule({
  declarations: [WeatherComponent],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    FormsModule,
    InputModule,
    LoaderModule,
  ],
})
export class WeatherModule {}
