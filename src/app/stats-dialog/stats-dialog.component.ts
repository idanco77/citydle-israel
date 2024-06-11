import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Guess} from 'src/app/shared/models/guess.model';
import {START_DATE} from 'src/app/shared/consts/start-date.const';
import {MatSnackBar} from '@angular/material/snack-bar';
import {analyzeDateStreaks} from 'src/app/shared/consts/analyze-date-streaks';

@Component({
  templateUrl: './stats-dialog.component.html'
})
export class StatsDialogComponent implements OnInit{
  hours: string | number;
  minutes: string | number;
  seconds: string | number;
  results: string;
  currentWinStreak: number | null;
  maxWinStreak: number | null;
  successRate: number;
  totalPlayedGames: number;
  private guesses: Guess[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {guesses: Guess[], isGameOver: boolean},
              private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.guesses = JSON.parse(localStorage.getItem('guesses') || '[]');
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    const analyze = analyzeDateStreaks(history);
    this.currentWinStreak = analyze.lastStreak;
    this.maxWinStreak = analyze.maxStreak;
    const rateData: number[] = JSON.parse(localStorage.getItem('successRate') || '[]');
    const totalWins = rateData.filter(isWin => isWin);
    this.successRate = rateData.length ? (totalWins.length / rateData.length) : 0;
    this.totalPlayedGames = +(localStorage.getItem('totalPlayedGames') ?? 0);

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
    const totalGuesses = this.guesses.filter(guess => guess.name).length;
    const highest = this.getHighest();

    this.results = `#citydle_il 🇮🇱 #${daysDifference} (${day}.${month}.${year}) ${totalGuesses}/6 (${highest}%) \n${emojis}https://citydle-il.web.app/`;
  }

  private getHighest(): number {
    let highest = 0;
    this.guesses.forEach(guess => {
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
    const buildSquaresRow = (guess: Guess): string[] => {
      const squares = Array(5).fill(whiteSquare); // Start with all white squares
      const greenCount = Math.floor((guess.percentage as number) / 20); // Calculate number of green squares (20% each)
      const remainder = (guess.percentage as number) % 20; // Calculate the remainder to determine yellow square
      const hasYellow = remainder >= 10 && remainder < 20; // Check if the remainder is in the yellow range

      squares.fill(greenSquare, 0, greenCount); // Fill green squares

      if (hasYellow && greenCount < 5) { // Add a yellow square if needed and there is space
        squares[greenCount] = yellowSquare;
      }

      squares.push(guess.direction);

      return squares;
    };

    const emojiMap: string[] = this.guesses
      .filter(guess => guess.percentage) // Filter guesses with valid percentages
      .map(guess => {
        const percentage = guess.percentage as number; // Ensure percentage is treated as a number
        return buildSquaresRow(guess).join('') + '\n'; // Build and join the emoji row, add newline
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
