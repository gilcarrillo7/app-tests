import { Component } from "@angular/core";

@Component({
  selector: "app-matrix",
  templateUrl: "./routes.component.html",
})
export class RoutesComponent {
  size = 0;

  matrix: number[][] = [];
  rotatedMatrix: number[][] = [];

  result = 0;

  error = "";

  onSubmit() {
    const grid = new Array(this.size + 1)
      .fill(0)
      .map(() => new Array(this.size + 1).fill(0));

    for (let i = 0; i <= this.size; i++) {
      grid[i][0] = 1;
      grid[0][i] = 1;
    }

    for (let i = 1; i <= this.size; i++)
      for (let j = 1; j <= this.size; j++)
        grid[i][j] = grid[i - 1][j] + grid[i][j - 1];

    this.result = grid[this.size][this.size];
  }
}
