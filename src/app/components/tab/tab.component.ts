import { Component, Input } from "@angular/core";

@Component({
  selector: "app-tab",
  templateUrl: "./tab.component.html",
})
export class TabComponent {
  @Input() text: string = "";
  @Input() link: string = "";
  @Input() active: boolean = false;
}
