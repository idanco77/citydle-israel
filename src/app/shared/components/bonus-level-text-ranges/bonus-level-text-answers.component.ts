import {Component, Input, OnInit} from '@angular/core';
import {TextAnswer} from 'src/app/shared/models/text-answer.model';
import {CityOver10K} from 'src/app/shared/models/city.model';
import {StateService} from 'src/app/shared/services/state.service';
import {StorageItem} from 'src/app/shared/models/storage-items.model';
import {HEBREW_LETTERS} from 'src/app/shared/consts/letters-mapper.const';
import {Levels} from 'src/app/shared/consts/steps.const';
import {startConfetti} from 'src/app/shared/consts/confetti.const';

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

  protected readonly SISTER_LEVEL = Levels.SISTER;
  protected readonly HEBREW_LETTERS = HEBREW_LETTERS;

  isClicked = false;


  constructor(private isGameOverService: StateService) {
  }

  ngOnInit() {
    const storageItems: StorageItem[] = [
      { storageKey: 'sisterCities', level: this.SISTER_LEVEL },
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
      startConfetti();
    }

    this.isGameOverService.addGrade(answer.isCorrect ? 2 : 0);

    answer.isClicked = true;
    const correctRange = this.textAnswers.find(range => range.isCorrect) as TextAnswer;
    correctRange.isClicked = true;

    if (this.step === this.SISTER_LEVEL) {
      localStorage.setItem('sisterCities', JSON.stringify(this.textAnswers));
    }
  }
}
