import {TextAnswer} from 'src/app/shared/models/text-answer.model';
import {CityOver10K} from 'src/app/shared/models/city.model';

export const getRandomElements = (arr: CityOver10K[], key: 'trivia' | 'sisterCities'): TextAnswer[] => {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  return selected.map(element => ({
    text: element[key] as string,
    isCorrect: false,
  }));
}
