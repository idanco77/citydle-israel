import {Component, Input, OnInit} from '@angular/core';
import {CityOver10K} from 'src/app/shared/models/city.model';
import {Range} from 'src/app/shared/models/range.model';
import {AREA_LEVEL, FOUNDED_YEAR_LEVEL, POPULATION_LEVEL, UNITS} from 'src/app/shared/consts/steps.const';

@Component({
  selector: 'app-bonus-level-number-ranges',
  templateUrl: './bonus-level-number-ranges.component.html',
  styleUrls: ['./bonus-level-number-ranges.component.scss']
})
export class BonusLevelNumberRangesComponent implements OnInit {
  @Input() ranges: Range[];
  @Input() mysteryCity: CityOver10K;
  @Input() question: string;
  @Input() answer: string;
  @Input() step: number;
  UNITS: any = UNITS;
  AREA_LEVEL = AREA_LEVEL;

  isClicked = false;

  ngOnInit() {
    let ranges = null;
    if (this.step === POPULATION_LEVEL) {
      ranges = JSON.parse(localStorage.getItem('population') || '[]');
    }
    if (this.step === AREA_LEVEL) {
      ranges = JSON.parse(localStorage.getItem('area') || '[]');
    }
    if (this.step === FOUNDED_YEAR_LEVEL) {
      ranges = JSON.parse(localStorage.getItem('foundedAt') || '[]');
    }
    if (ranges?.length) {
    this.ranges = ranges;
      this.isClicked = true;
    }
  }

  isAnswerCorrect(range: Range) {
    this.isClicked = true;
    range.isClicked = true;
    const correctRange = this.ranges.find(range => range.isCorrect) as Range;
    correctRange.isClicked = true;

    if (this.step === POPULATION_LEVEL) {
      localStorage.setItem('population', JSON.stringify(this.ranges));
    }
    if (this.step === AREA_LEVEL) {
      localStorage.setItem('area', JSON.stringify(this.ranges));
    }
    if (this.step === FOUNDED_YEAR_LEVEL) {
      localStorage.setItem('foundedAt', JSON.stringify(this.ranges));
    }
  }
}
