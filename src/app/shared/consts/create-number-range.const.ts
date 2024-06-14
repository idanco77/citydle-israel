import {RangeAnswer} from 'src/app/shared/models/range-answer.model';

export const createRanges = (minRange: number, maxRange: number, jump: number): RangeAnswer[] => {
  const ranges: RangeAnswer[] = [];

  for (let i = minRange; i < maxRange; i += jump) {
    const range: RangeAnswer = {
      min: i,
      max: Math.min(i + jump, maxRange),
      isCorrect: false,
    };
    ranges.push(range);
  }

  return ranges;
}

export const createAnswers = (number: number, ranges: RangeAnswer[]): RangeAnswer[] => {
  const ind: number = ranges.findIndex(range => number >= range.min && number <= range.max);
  const data: RangeAnswer[] = [];
  ranges[ind].isCorrect = true;

  if (ind - 1 >= 0) data.push(ranges[ind - 1]);
  if (ind - 2 >= 0) data.push(ranges[ind - 2]);
  if (ind - 3 >= 0) data.push(ranges[ind - 3]);
  if (ind + 1 < ranges.length) data.push(ranges[ind + 1]);
  if (ind + 2 < ranges.length) data.push(ranges[ind + 2]);
  if (ind + 3 < ranges.length) data.push(ranges[ind + 3]);

  let answers: RangeAnswer[] = getRandomSubarray(data);
  answers.push(ranges[ind]);
  answers = shuffleArray(answers);

  return answers;
}

const getRandomSubarray = (arr: RangeAnswer[]): RangeAnswer[] => {
  let shuffled = arr.slice(0), i = arr.length, temp, index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, 3);
};

export const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements

  }

  return array;
}

