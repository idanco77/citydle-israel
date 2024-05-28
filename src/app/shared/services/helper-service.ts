import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class HelperService {
  roundToNearestHalf(num: number): number {
    return Math.round(num * 2) / 2;
  }
}
