import {Component, Input} from '@angular/core';
import {CityOver10K} from 'src/app/shared/models/city.model';
import {range} from 'src/app/shared/models/range.model';

@Component({
  selector: 'app-bonus-level-number-ranges',
  templateUrl: './bonus-level-number-ranges.component.html',
  styleUrls: ['./bonus-level-number-ranges.component.scss']
})
export class BonusLevelNumberRangesComponent {
  @Input() ranges: range[];
  @Input() mysteryCity: CityOver10K;
  @Input() question: string;
  @Input() answer: string;

  isClicked = false;

  isAnswerCorrect(range: range) {
    this.isClicked = true;
    range.isClicked = true;
    const correctRange = this.ranges.find(range => range.isCorrect) as range;
    correctRange.isClicked = true;
  }

}
