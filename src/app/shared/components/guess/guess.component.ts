import {Component, Input} from '@angular/core';
import {Guess} from 'src/app/shared/models/guess.model';
import {CityOver10K} from 'src/app/shared/models/city.model';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss']
})
export class GuessComponent {
  @Input() guess: Guess;
  @Input() mysteryCityName: string | null;
}
