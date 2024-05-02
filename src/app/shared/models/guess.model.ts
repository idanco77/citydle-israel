import {directions} from 'src/app/shared/types/directions.type';

export interface Guess {
  name: string | null;
  distance: number | null;
  percentage: number | null;
  direction: directions | null;
}
