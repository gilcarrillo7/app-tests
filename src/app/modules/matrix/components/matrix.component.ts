import { Component } from "@angular/core";

@Component({
  selector: "app-matrix",
  templateUrl: "./matrix.component.html",
})
export class MatrixComponent {
  size = 0;
  rot = "";
  coordX = 0;
  coordY = 0;

  matrix: number[][] = [];
  rotatedMatrix: number[][] = [];

  result = 0;

  error = "";

  onSubmit() {
    const regexp = /^-?\d+(,-?\d+)*$/;
    this.error = "";
    this.result = 0;
    if (!regexp.test(this.rot)) {
      this.error = "Ingresa una cadena válida";
    } else if (this.size > 0) {
      this.genMatrix();
      this.rotateMatrix();
      this.result = this.rotatedMatrix[this.coordX][this.coordY];
    }
  }

  genMatrix() {
    this.matrix = new Array(this.size);
    let contador = 1;

    for (let i = 0; i < this.size; i++) {
      this.matrix[i] = new Array(this.size);
      this.rotatedMatrix[i] = new Array(this.size);
      for (let j = 0; j < this.size; j++) {
        this.matrix[i][j] = contador;
        this.rotatedMatrix[i][j] = contador;
        contador++;
      }
    }
  }

  rotateMatrix() {
    const rotations = this.rot.split(",").map((num) => Number(num));
    this.copyMatrix(this.rotatedMatrix, this.matrix);

    for (const rotacion of rotations) {
      if (rotacion > 0) {
        // Rotación a la derecha
        for (let rot = 0; rot < rotacion; rot++) {
          for (let i = 0; i < this.size; i++)
            for (let j = 0; j < this.size; j++) {
              if (i === 0 && j !== 0)
                this.rotatedMatrix[i][j] = this.matrix[0][j - 1];
              else if (i !== 0 && j === this.size - 1)
                this.rotatedMatrix[i][j] = this.matrix[i - 1][this.size - 1];
              else if (i === this.size - 1 && j !== this.size - 1)
                this.rotatedMatrix[i][j] = this.matrix[this.size - 1][j + 1];
              else if (j === 0 && i !== this.size - 1)
                this.rotatedMatrix[i][j] = this.matrix[i + 1][0];
            }
          this.copyMatrix(this.matrix, this.rotatedMatrix);
        }
      } else if (rotacion < 0) {
        // Rotación a la izquierda
        for (let rot = 0; rot > rotacion; rot--) {
          for (let i = 0; i < this.size; i++)
            for (let j = 0; j < this.size; j++) {
              if (i === 0 && j !== this.size - 1)
                this.rotatedMatrix[i][j] = this.matrix[0][j + 1];
              else if (i !== 0 && j === 0)
                this.rotatedMatrix[i][j] = this.matrix[i - 1][0];
              else if (i === this.size - 1 && j !== 0)
                this.rotatedMatrix[i][j] = this.matrix[this.size - 1][j - 1];
              else if (i !== this.size - 1 && j === this.size - 1)
                this.rotatedMatrix[i][j] = this.matrix[i + 1][this.size - 1];
            }
          this.copyMatrix(this.matrix, this.rotatedMatrix);
        }
      }
    }
  }

  copyMatrix(matA: number[][], matB: number[][]) {
    for (let i = 0; i < this.size; i++)
      for (let j = 0; j < this.size; j++) matA[i][j] = matB[i][j];
  }
}
