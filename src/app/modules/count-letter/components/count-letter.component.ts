import { Component } from "@angular/core";

@Component({
  selector: "app-count-letter",
  templateUrl: "./count-letter.component.html",
})
export class CountLetterComponent {
  word = "";
  letterList = new Map<string, number>();

  isBisiesto(anio: number) {
    return (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0;
  }

  onSubmit() {
    this.letterList = new Map<string, number>();
    const wordArr = this.word.split("");
    const letters = [...new Set(wordArr)];
    letters.forEach((letter) =>
      this.letterList.set(
        letter,
        wordArr.filter((wrd) => wrd === letter).length
      )
    );
    console.log(this.letterList);
  }
}
