import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./modules/weather/weather.module").then((m) => m.WeatherModule),
  },
  {
    path: "test1",
    loadChildren: () =>
      import("./modules/weather/weather.module").then((m) => m.WeatherModule),
  },
  {
    path: "test2",
    loadChildren: () =>
      import("./modules/sunday/sunday.module").then((m) => m.SundayModule),
  },
  {
    path: "test3",
    loadChildren: () =>
      import("./modules/leap-year/leap-year.module").then(
        (m) => m.LeapYearModule
      ),
  },
  {
    path: "test4",
    loadChildren: () =>
      import("./modules/matrix/matrix.module").then((m) => m.MatrixModule),
  },
  {
    path: "test5",
    loadChildren: () =>
      import("./modules/count-letter/count-letter.module").then(
        (m) => m.CountLetterModule
      ),
  },
  {
    path: "test6",
    loadChildren: () =>
      import("./modules/routes/routes.module").then((m) => m.RoutesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
