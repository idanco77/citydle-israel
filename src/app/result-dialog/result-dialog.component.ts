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

    this.results = `#CitydleIl #${daysDifference} (${day}.${month}.${year}) ${totalGuesses}/6 (${highest}%) \n${emojis}https://citydle-il.web.app/`;
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
    const yellowSquare = '🟨';

// Builds a row of squares based on percentage
    const buildSquaresRow = (percentage: number): string[] => {
      const squares = Array(5).fill(whiteSquare); // Start with all white squares
      const greenCount = Math.floor(percentage / 20); // Calculate number of green squares (20% each)
      const remainder = percentage % 20; // Calculate the remainder to determine yellow square
      const hasYellow = remainder >= 10 && remainder < 20; // Check if the remainder is in the yellow range

      squares.fill(greenSquare, 0, greenCount); // Fill green squares

      if (hasYellow && greenCount < 5) { // Add a yellow square if needed and there is space
        squares[greenCount] = yellowSquare;
      }

      return squares;
    };

    const emojiMap: string[] = this.data.guesses
      .filter(guess => guess.percentage) // Filter guesses with valid percentages
      .map(guess => {
        const percentage = guess.percentage as number; // Ensure percentage is treated as a number
        return buildSquaresRow(percentage).join('') + '\n'; // Build and join the emoji row, add newline
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
