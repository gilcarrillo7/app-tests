import { Component, EventEmitter, Output, Input } from "@angular/core";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
})
export class InputComponent {
  @Input() name = "";
  @Input() label = "";
  @Output() onChange = new EventEmitter<number>();
  value = 0;

  emitChange() {
    this.onChange.emit(this.value);
  }
}
