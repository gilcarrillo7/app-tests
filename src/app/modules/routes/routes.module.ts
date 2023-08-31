import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RoutesComponent } from "./components/routes.component";
import { RoutesRoutingModule } from "./routes-routing.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [RoutesComponent],
  imports: [CommonModule, RoutesRoutingModule, FormsModule],
})
export class RoutesModule {}
