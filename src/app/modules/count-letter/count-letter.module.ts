import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CountLetterComponent } from "./components/count-letter.component";
import { CountLetterRoutingModule } from "./count-letter-routing.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [CountLetterComponent],
  imports: [CommonModule, CountLetterRoutingModule, FormsModule],
})
export class CountLetterModule {}
