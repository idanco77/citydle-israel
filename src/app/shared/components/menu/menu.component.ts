import {Component, Input} from '@angular/core';
import {faCircleQuestion} from '@fortawesome/free-solid-svg-icons';
import {faChartSimple} from '@fortawesome/free-solid-svg-icons/faChartSimple';
import {ResultDialogComponent} from 'src/app/result-dialog/result-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { CityOver10K } from '../../models/city.model';
import {Guess} from 'src/app/shared/models/guess.model';
import {IntroDialogComponent} from 'src/app/intro-dialog/intro-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  protected readonly faCircleQuestion = faCircleQuestion;
  protected readonly faChartSimple = faChartSimple;
  @Input() isGameOver: boolean;
  @Input() guesses: Guess[];
  @Input() isWin: boolean;
  @Input() mysteryCity: CityOver10K;

  constructor(private dialog: MatDialog) {
  }

  openResultsDialog(): void {
    this.dialog.open(ResultDialogComponent, {
      width: '800px',
      data: {
        city: this.mysteryCity,
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


}
