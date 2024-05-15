import {Component, Input, OnInit} from '@angular/core';
import {
  LEVELS,
  SISTER_LEVEL,
  TRIVIA_LEVEL
} from 'src/app/shared/consts/steps.const';
import {TextAnswer} from 'src/app/shared/models/text-answer.model';
import {CityOver10K} from 'src/app/shared/models/city.model';
import {IsGameOverService} from 'src/app/shared/services/is-game-over.service';
import {StorageItem} from 'src/app/shared/models/storage-items.model';

@Component({
  selector: 'app-bonus-level-text-answers',
  templateUrl: './bonus-level-text-answers.component.html'
})
export class BonusLevelTextAnswersComponent implements OnInit{
  @Input() textAnswers: TextAnswer[];
  @Input() mysteryCity: CityOver10K;
  @Input() question: string;
  @Input() answer: string;
  @Input() step: number;
  isClicked = false;
  shouldStartFireworks = false;

  constructor(private isGameOverService: IsGameOverService) {
  }

  ngOnInit() {
    const storageItems: StorageItem[] = [
      { storageKey: 'trivia', level: TRIVIA_LEVEL },
      { storageKey: 'sisterCities', level: SISTER_LEVEL },
    ];

    storageItems.forEach(item => {
      if (this.step === item.level) {
        const textAnswers = JSON.parse(localStorage.getItem(item.storageKey) || '[]');
        if (!textAnswers.length) {
          localStorage.setItem(item.storageKey, JSON.stringify(this.textAnswers));
        } else {
          this.textAnswers = textAnswers;
        }
      }
    });

    if (this.textAnswers.find(answer => answer.isClicked)) {
        this.isClicked = true;
    }
  }

  isAnswerCorrect(answer: TextAnswer) {
    if (answer.isClicked) {
      return;
    }
    this.isClicked = true;
    if (answer.isCorrect && !answer.isClicked) {
      this.shouldStartFireworks = true;
    }
    answer.isClicked = true;
    const correctRange = this.textAnswers.find(range => range.isCorrect) as TextAnswer;
    correctRange.isClicked = true;

    if (this.step === TRIVIA_LEVEL) {
      localStorage.setItem('trivia', JSON.stringify(this.textAnswers));
    }

    if (this.step === SISTER_LEVEL) {
      localStorage.setItem('sisterCities', JSON.stringify(this.textAnswers));
    }

    if (this.step === LEVELS.length - 1) {
      this.isGameOverService.isGameOver.next(true);
    }
  }
}
