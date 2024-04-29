import {Component, OnInit} from '@angular/core';
import {analyzeDateStreaks} from 'src/app/shared/consts/analyze-date-streaks';

@Component({
  templateUrl: './stats.component.html'
})
export class StatsComponent implements OnInit {
  currentWinStreak: number | null;
  maxWinStreak: number | null;
  successRate: number;
  totalPlayedGames: number;

  ngOnInit() {
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    const analyze = analyzeDateStreaks(history);
    this.currentWinStreak = analyze.lastStreak;
    this.maxWinStreak = analyze.maxStreak;
    const rateData: number[] = JSON.parse(localStorage.getItem('successRate') || '[]');
    const totalWins = rateData.filter(isWin => isWin);
    this.successRate = rateData.length ? (totalWins.length / rateData.length) : 0;
    this.totalPlayedGames = +(localStorage.getItem('totalPlayedGames') ?? 0);
  }
}
