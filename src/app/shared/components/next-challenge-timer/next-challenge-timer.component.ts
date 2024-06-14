import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-next-challenge-timer',
  templateUrl: './next-challenge-timer.component.html'
})
export class NextChallengeTimerComponent implements OnInit {
  hours: string | number;
  minutes: string | number;
  seconds: string | number;

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
