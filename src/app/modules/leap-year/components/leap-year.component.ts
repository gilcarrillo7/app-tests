import { Component } from "@angular/core";

@Component({
  selector: "app-leap-year",
  templateUrl: "./leap-year.component.html",
})
export class LeapYearComponent {
  inicio = 0;
  fin = 0;
  anios: number[] = [];

  isBisiesto(anio: number) {
    return (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0;
  }

  onSubmit() {
    this.anios = [];
    for (let i = this.inicio; i <= this.fin; i++) {
      if (this.isBisiesto(i)) this.anios.push(i);
    }
  }
}
