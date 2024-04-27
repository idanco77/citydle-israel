import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CityOver10K} from 'src/app/shared/models/city.model';
import {Guess} from 'src/app/shared/models/guess.model';
import {START_DATE} from 'src/app/shared/consts/start-date.const';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  templateUrl: './result-dialog.component.html'
})
export class ResultDialogComponent implements OnInit{
  hours: string | number;
  minutes: string | number;
  seconds: string | number;
  results: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {city: CityOver10K, isWin: boolean, guesses: Guess[]},
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    const timeRemaining = () => {
      const now: Date = new Date();
      const hoursLeft: number = 23 - now.getHours();
      const minutesLeft: number = 59 - now.getMinutes();
      const secondsLeft: number = 59 - now.getSeconds();

      const formatNumber = (num: number): string | number => (num < 10 ? '0' + num : num);

      this.hours = formatNumber(hoursLeft);
      this.minutes = formatNumber(minutesLeft);
      this.seconds = formatNumber(secondsLeft);
    };
    timeRemaining();
    setInterval(timeRemaining, 1000);

    const emojis = this.generateProgressSquares();
    const daysDifference = Math.floor((new Date().getTime() - new Date(START_DATE).getTime()) / (1000 * 3600 * 24));
    const day = String(new Date().getDate()).padStart(2, '0');
    const month = String(new Date().getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = new Date().getFullYear();
    const totalGuesses = this.data.guesses.filter(guess => guess.name).length;
    const highest = this.getHighest();

    this.results = `#Citydle-il #${daysDifference} (${day}.${month}.${year}) ${totalGuesses}/6 (${highest}%) \n${emojis}https://citydle-il.web.app/`;

    console.log(this.results);
  }

  private getHighest(): number {
    let highest = 0;
    this.data.guesses.forEach(guess => {
      const value = guess.percentage;
      if (value && value > highest) {
        highest = value;
      }
    });

    return highest;
  }

  private generateProgressSquares(): string {
    const greenSquare = '🟩';
    const whiteSquare = '⬜';

    const buildEmojiRow = (greenCount: number): string[] =>
    Array(5).fill(whiteSquare).fill(greenSquare, 0, greenCount);

    const emojiMap: string[] = this.data.guesses
      .filter(guess => guess.percentage)
      .map(guess => {
        const greenCount = Math.floor((guess.percentage as number) / 20);
        return buildEmojiRow(greenCount).join('') + '\n';
      });

    return emojiMap.join('');
  }

  showMessage() {
    this.snackBar.open('הועתק ללוח', '', {
      duration: 1500,
      horizontalPosition: 'center',
      politeness: 'polite',
      verticalPosition: 'top'
    });
  }
}
