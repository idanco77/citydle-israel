import {Component, Input} from '@angular/core';
import {faCircleQuestion, faMedal} from '@fortawesome/free-solid-svg-icons';
import {faChartSimple} from '@fortawesome/free-solid-svg-icons/faChartSimple';
import {StatsDialogComponent} from 'src/app/stats-dialog/stats-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { CityOver10K } from '../../models/city.model';
import {Guess} from 'src/app/shared/models/guess.model';
import {IntroDialogComponent} from 'src/app/intro-dialog/intro-dialog.component';
import {ResultsDialogComponent} from 'src/app/results-dialog/results-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  protected readonly faCircleQuestion = faCircleQuestion;
  protected readonly faChartSimple = faChartSimple;
  protected readonly faMedal = faMedal;
  @Input() isGameOver: boolean;
  @Input() guesses: Guess[];
  @Input() isWin: boolean;
  @Input() mysteryCity: CityOver10K;

  constructor(private dialog: MatDialog) {}

  openStatsDialog(): void {
    this.dialog.open(StatsDialogComponent, {
      width: '350px',
      data: {
        guesses: this.guesses,
        isGameOver: this.isGameOver
      }
    });
  }

  openIntroDialog() {
    this.dialog.open(IntroDialogComponent, {
      width: '500px'
    });
  }

  openResultsDialog() {
    this.dialog.open(ResultsDialogComponent, {
      width: '650px'
    })
  }
}
