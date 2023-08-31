import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SundayComponent } from "./components/sunday.component";
import { SundayRoutingModule } from "./sunday-routing.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [SundayComponent],
  imports: [CommonModule, SundayRoutingModule, FormsModule],
})
export class SundayModule {}
