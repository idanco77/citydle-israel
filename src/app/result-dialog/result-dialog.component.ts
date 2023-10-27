import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {City} from 'src/app/shared/models/city.model';

@Component({
  templateUrl: './result-dialog.component.html'
})
export class ResultDialogComponent implements OnInit{
   hours: string | number;
   minutes: string | number;
   seconds: string | number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {city: City, isWin: boolean}) {
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
  }


}
