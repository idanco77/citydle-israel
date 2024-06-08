import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {faCircleQuestion, faMedal, faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import {faChartSimple} from '@fortawesome/free-solid-svg-icons/faChartSimple';
import {StatsDialogComponent} from 'src/app/stats-dialog/stats-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Guess} from 'src/app/shared/models/guess.model';
import {IntroDialogComponent} from 'src/app/intro-dialog/intro-dialog.component';
import {ResultsDialogComponent} from 'src/app/results-dialog/results-dialog.component';
import {StateService} from 'src/app/shared/services/state.service';
import {LEVELS} from 'src/app/shared/consts/steps.const';
import {Subscription} from 'rxjs';
import {CityOver10K} from 'src/app/shared/models/city.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  protected readonly faCircleQuestion = faCircleQuestion;
  protected readonly faChartSimple = faChartSimple;
  protected readonly faMedal = faMedal;
  protected readonly faSun = faSun;
  protected readonly faMoon = faMoon;
  @Input() guesses: Guess[];
  @Input() isWin: boolean;
  @Input() mysteryCity: CityOver10K;

  isGameOver: boolean;
  private subs: Subscription = new Subscription();
  isDarkMode: boolean;

  constructor(private dialog: MatDialog, private isGameOverService: StateService) {}

  ngOnInit(): void {
    if (localStorage.getItem('isDarkMode') === '1') {
      this.toggleIsDarkMode();
    }

    const levels = JSON.parse(localStorage.getItem('levels') || '[]');
    if (levels.length === LEVELS.length) {
      this.isGameOver = true;
    }
    this.subs.add(this.isGameOverService.isGameOver.subscribe(isGameOver => {
      this.isGameOver = isGameOver;
    }));
  }

  openStatsDialog(): void {
    this.dialog.open(StatsDialogComponent, {
      width: '350px',
      data: {
        guesses: this.guesses,
        isGameOver: this.isGameOver
      }
    });
  }

  openIntroDialog(): void {
    this.dialog.open(IntroDialogComponent, {
      width: '500px'
    });
  }

  openResultsDialog(): void {
    this.dialog.open(ResultsDialogComponent, {
      width: '650px'
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  toggleIsDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('isDarkMode', this.isDarkMode ? '1' : '0');
    this.isGameOverService.toggleDarkMode.next(this.isDarkMode);
  }
}
