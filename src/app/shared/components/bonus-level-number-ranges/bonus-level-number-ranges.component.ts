import {Component, Input, OnInit} from '@angular/core';
import {CityOver10K} from 'src/app/shared/models/city.model';
import {RangeAnswer} from 'src/app/shared/models/range-answer.model';
import {
  AREA_LEVEL,
  FOUNDED_YEAR_LEVEL,
  POPULATION_LEVEL,
  SISTER_LEVEL,
  TRIVIA_LEVEL,
  UNITS
} from 'src/app/shared/consts/steps.const';
import {DecimalPipe} from '@angular/common';
import {StorageItem} from 'src/app/shared/models/storage-items.model';

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
  shouldStartFireworks = false;

  constructor(private decimalPipe: DecimalPipe) {}

  ngOnInit() {
    const storageItems: StorageItem[] = [
      { storageKey: 'population', level: POPULATION_LEVEL },
      { storageKey: 'area', level: AREA_LEVEL },
      { storageKey: 'foundedAt', level: FOUNDED_YEAR_LEVEL },
    ];

    storageItems.forEach(item => {
      if (this.step === item.level) {
        const textAnswers = JSON.parse(localStorage.getItem(item.storageKey) || '[]');
        if (!textAnswers.length) {
          localStorage.setItem(item.storageKey, JSON.stringify(this.rangeAnswers));
        } else {
          this.rangeAnswers = textAnswers;
        }
      }
    });

    if (this.rangeAnswers.find(answer => answer.isClicked)) {
      this.isClicked = true;
    }
  }

  isAnswerCorrect(answer: RangeAnswer) {
    this.isClicked = true;

    if (answer.isCorrect && !answer.isClicked) {
      this.shouldStartFireworks = true;
    }

    answer.isClicked = true;
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

  getFormattedAnswer(answer: RangeAnswer) {
    if (answer.min === 0 && answer.max === 0) {
      return 'לא ידוע';
    }

    const min = (this.step === FOUNDED_YEAR_LEVEL) ? answer.min : this.decimalPipe.transform(answer.min, '1.0-0');
    const max = (this.step === FOUNDED_YEAR_LEVEL) ? answer.max : this.decimalPipe.transform(answer.max, '1.0-0');

    return `${min}-${max}${this.UNITS[this.step]}`;
  }
}
