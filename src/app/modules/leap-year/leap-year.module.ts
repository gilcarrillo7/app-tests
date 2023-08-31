import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LeapYearComponent } from "./components/leap-year.component";
import { LeapYearRoutingModule } from "./leap-year-routing.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [LeapYearComponent],
  imports: [CommonModule, LeapYearRoutingModule, FormsModule],
})
export class LeapYearModule {}
