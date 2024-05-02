import {Component} from '@angular/core';
import {Guess} from 'src/app/shared/models/guess.model';

@Component({
  templateUrl: './intro-dialog.component.html'
})
export class IntroDialogComponent {
  firstGuess = {name: 'טבריה', distance: 111, percentage: 74, direction: '↙️'} as Guess;
  secondGuess = {name: 'אשדוד', distance: 27, percentage: 93, direction: '⬆️'} as Guess;
  thirdGuess = {name: 'חולון', distance: 0, percentage: 100, direction: '🏆'} as Guess;
}
