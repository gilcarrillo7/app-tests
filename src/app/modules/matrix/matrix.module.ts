import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatrixComponent } from "./components/matrix.component";
import { MatrixRoutingModule } from "./matrix-routing.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [MatrixComponent],
  imports: [CommonModule, MatrixRoutingModule, FormsModule],
})
export class MatrixModule {}
