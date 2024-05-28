import { Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class IsGameOverService {
  isGameOver = new Subject<boolean>();
  grade = 0;

  addGrade(value: number) {
    this.grade += value;
    localStorage.setItem('grade', this.grade.toString());
  }

  getCurrentGrade(): number {
    return +(localStorage.getItem('grade') ?? 0);
  }
}
