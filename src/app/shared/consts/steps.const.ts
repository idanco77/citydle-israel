export enum Levels {
  GUESSES,
  POPULATION,
  FOUNDED_YEAR,
  AREA,
  NEAREST_CITY,
}
export const LEVELS = Object.values(Levels).filter(value => typeof value === 'number');

export const UNITS: { [key in Levels]?: string } = {
  [Levels.POPULATION]: ' תושבים',
  [Levels.AREA]: ' דונם',
  [Levels.GUESSES]: '',
  [Levels.NEAREST_CITY]: '',
  [Levels.FOUNDED_YEAR]: '',
};
