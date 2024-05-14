import {Component, Input, OnInit} from '@angular/core';
import {
  FOUNDED_YEAR_LEVEL,
  LEVELS,
  POPULATION_LEVEL,
  SISTER_LEVEL,
  TRIVIA_LEVEL
} from 'src/app/shared/consts/steps.const';
import {RangeAnswer} from 'src/app/shared/models/range-answer.model';
import {TextAnswer} from 'src/app/shared/models/text-answer.model';
import {CityOver10K} from 'src/app/shared/models/city.model';
import {IsGameOverService} from 'src/app/shared/services/is-game-over.service';

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
    let answers = null;
    if (this.step === TRIVIA_LEVEL) {
      answers = JSON.parse(localStorage.getItem('trivia') || '[]');
    }
    if (this.step === SISTER_LEVEL) {
      answers = JSON.parse(localStorage.getItem('sisterCities') || '[]');
    }

    if (answers?.length) {
        this.textAnswers = answers;
        this.isClicked = true;
    }
  }

  isAnswerCorrect(answer: TextAnswer) {
    this.isClicked = true;
    answer.isClicked = true;
    const correctRange = this.textAnswers.find(range => range.isCorrect) as TextAnswer;
    correctRange.isClicked = true;

    if (answer.isCorrect) {
      this.shouldStartFireworks = true;
    }

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
