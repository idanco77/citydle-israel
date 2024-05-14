import {Component, Input, OnInit} from '@angular/core';
import {CityOver10K} from 'src/app/shared/models/city.model';
import {RangeAnswer} from 'src/app/shared/models/range-answer.model';
import {AREA_LEVEL, FOUNDED_YEAR_LEVEL, POPULATION_LEVEL, TRIVIA_LEVEL, UNITS} from 'src/app/shared/consts/steps.const';
import {TextAnswer} from 'src/app/shared/models/text-answer.model';

@Component({
  selector: 'app-bonus-level-number-ranges',
  templateUrl: './bonus-level-number-ranges.component.html',
})
export class BonusLevelNumberRangesComponent implements OnInit {
  @Input() rangeAnswers: RangeAnswer[];
  @Input() mysteryCity: CityOver10K;
  @Input() question: string;
  @Input() answer: string;
  @Input() step: number;
  UNITS: any = UNITS;
  AREA_LEVEL = AREA_LEVEL;

  isClicked = false;

  ngOnInit() {
    let answers = null;
    if (this.step === POPULATION_LEVEL) {
      answers = JSON.parse(localStorage.getItem('population') || '[]');
    }
    if (this.step === AREA_LEVEL) {
      answers = JSON.parse(localStorage.getItem('area') || '[]');
    }
    if (this.step === FOUNDED_YEAR_LEVEL) {
      answers = JSON.parse(localStorage.getItem('foundedAt') || '[]');
    }
    if (this.step === TRIVIA_LEVEL) {
      answers = JSON.parse(localStorage.getItem('trivia') || '[]');
    }
    if (answers?.length) {
      this.rangeAnswers = answers;
      this.isClicked = true;
    }
  }

  isAnswerCorrect(range: RangeAnswer | TextAnswer) {
    this.isClicked = true;
    range.isClicked = true;
    const correctRange = this.rangeAnswers.find(range => range.isCorrect) as RangeAnswer;
    correctRange.isClicked = true;

    if (this.step === POPULATION_LEVEL) {
      localStorage.setItem('population', JSON.stringify(this.rangeAnswers));
    }
    if (this.step === AREA_LEVEL) {
      localStorage.setItem('area', JSON.stringify(this.rangeAnswers));
    }
    if (this.step === FOUNDED_YEAR_LEVEL) {
      localStorage.setItem('foundedAt', JSON.stringify(this.rangeAnswers));
    }
  }
}
