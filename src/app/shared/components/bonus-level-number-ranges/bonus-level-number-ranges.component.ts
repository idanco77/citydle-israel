import {Component, Input, OnInit} from '@angular/core';
import {CityOver10K} from 'src/app/shared/models/city.model';
import {RangeAnswer} from 'src/app/shared/models/range-answer.model';
import {LEVELS, Levels, UNITS} from 'src/app/shared/consts/steps.const';
import {DecimalPipe} from '@angular/common';
import {StorageItem} from 'src/app/shared/models/storage-items.model';
import {IsGameOverService} from 'src/app/shared/services/is-game-over.service';
import {HEBREW_LETTERS} from 'src/app/shared/consts/letters-mapper.const';
import {startConfetti} from 'src/app/shared/consts/confetti.const';

@Component({
  selector: 'app-bonus-level-number-ranges',
  templateUrl: './bonus-level-number-ranges.component.html',
})
export class BonusLevelNumberRangesComponent implements OnInit {
  @Input() rangeAnswers: RangeAnswer[];
  @Input() mysteryCity: CityOver10K;
  @Input() question: string;
  @Input() answer: string | number | null;
  @Input() step: number;
  protected readonly String = String;
  UNITS: any = UNITS;
  AREA_LEVEL = Levels.AREA;
  POPULATION_LEVEL = Levels.POPULATION;
  FOUNDED_YEAR_LEVEL = Levels.FOUNDED_YEAR;
  HEBREW_LETTERS = HEBREW_LETTERS;
  LEVELS = LEVELS.length - 1;

  isClicked = false;

  constructor(private decimalPipe: DecimalPipe, private isGameOverService: IsGameOverService) {}

  ngOnInit() {
    const storageItems: StorageItem[] = [
      { storageKey: 'population', level: this.POPULATION_LEVEL },
      { storageKey: 'area', level: this.AREA_LEVEL },
      { storageKey: 'foundedAt', level: this.FOUNDED_YEAR_LEVEL },
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
      startConfetti();
    }

    this.isGameOverService.addGrade(answer.isCorrect ? 2 : 0);

    answer.isClicked = true;
    const correctRange = this.rangeAnswers.find(range => range.isCorrect) as RangeAnswer;
    correctRange.isClicked = true;

    if (this.step === this.POPULATION_LEVEL) {
      localStorage.setItem('population', JSON.stringify(this.rangeAnswers));
    }
    if (this.step === this.AREA_LEVEL) {
      localStorage.setItem('area', JSON.stringify(this.rangeAnswers));
    }
    if (this.step === this.FOUNDED_YEAR_LEVEL) {
      localStorage.setItem('foundedAt', JSON.stringify(this.rangeAnswers));
    }

    if (this.step === this.LEVELS) {
      this.isGameOverService.isGameOver.next(true);
    }
  }

  getFormattedAnswer(answer: RangeAnswer) {
    const min = (this.step === this.FOUNDED_YEAR_LEVEL) ? answer.min : this.decimalPipe.transform(answer.min, '1.0-0');
    const max = (this.step === this.FOUNDED_YEAR_LEVEL) ? answer.max : this.decimalPipe.transform(answer.max, '1.0-0');

    return `${min}-${max}${this.UNITS[this.step]}`;
  }
}
