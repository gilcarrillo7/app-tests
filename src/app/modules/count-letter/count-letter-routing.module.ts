import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CountLetterComponent } from "./components/count-letter.component";

const routes: Routes = [
  {
    path: "",
    component: CountLetterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountLetterRoutingModule {}
