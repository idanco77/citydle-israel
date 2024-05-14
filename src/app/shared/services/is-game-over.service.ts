import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class IsGameOverService {
  isGameOver = new Subject<boolean>();
}
