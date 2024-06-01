import { Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {LEVELS} from 'src/app/shared/consts/steps.const';

@Injectable()
export class stateService {
  isGameOver = new Subject<boolean>();
  grade = 0;
  levels: boolean[] = JSON.parse(localStorage.getItem('levels') || '[]');

  completeLevel() {
    this.levels.push(true);
    localStorage.setItem('levels', JSON.stringify(this.levels));
    if (this.levels.length === LEVELS.length) {
      this.isGameOver.next(true);
    }
  }

  addGrade(value: number) {
    this.grade += value;
    localStorage.setItem('grade', this.grade.toString());
    this.completeLevel();
  }

  getCurrentGrade(): number {
    return +(localStorage.getItem('grade') ?? 0);
  }
}
