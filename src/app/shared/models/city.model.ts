export type City = CityOver10K | CityLessThen10K;

export interface CityLessThen10K {
  name: string;
  lat: number;
  lng: number;
  population: number;
  distance?: number;
}

export interface CityOver10K {
  name: string;
  lat: number;
  lng: number;
  population: number;
  foundedAt: number | null;
  religion: 'יהודי' | 'ערבי מוסלמי' | 'ערבי נוצרי' | 'דרוזי';
  trivia: string;
  area: number;
  sisterCities: string | null;
  distance?: number;
  isCorrect?: boolean;
}
