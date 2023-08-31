import { Component } from "@angular/core";

@Component({
  selector: "app-sunday",
  templateUrl: "./sunday.component.html",
})
export class SundayComponent {
  inicio = "";
  fin = "";
  dias = 0;

  isSunday(anio: number, mes: number) {
    const fecha = new Date(anio, mes, 1);
    fecha.setMonth(fecha.getMonth() + 1);
    fecha.setDate(fecha.getDate() - 1);
    return fecha.getDay() === 0;
  }

  onSubmit() {
    this.dias = 0;
    const ini = new Date(this.inicio);
    const fin = new Date(this.fin);
    for (let anio = ini.getFullYear(); anio <= fin.getFullYear(); anio++) {
      const iniMes = anio === ini.getFullYear() ? ini.getMonth() : 0;
      const finMes = anio === fin.getFullYear() ? fin.getMonth() : 11;
      for (let mes = iniMes; mes < finMes; mes++) {
        if (this.isSunday(anio, mes)) this.dias++;
      }
    }
  }
}
