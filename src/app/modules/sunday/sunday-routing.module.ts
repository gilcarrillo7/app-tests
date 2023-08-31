import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SundayComponent } from "./components/sunday.component";

const routes: Routes = [
  {
    path: "",
    component: SundayComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SundayRoutingModule {}
