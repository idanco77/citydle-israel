export type City = CityOver10K | CityLessThen10K;

export interface CityLessThen10K {
  name: string;
  lat: string;
  lng: string;
  population: number;
}

export interface CityOver10K {
  name: string;
  lat: string;
  lng: string;
  population: number;
  foundedAt: string;
  religion: 'יהודי' | 'ערבי מוסלמי' | 'ערבי נוצרי' | 'דרוזי';
  trivia: string;
}
