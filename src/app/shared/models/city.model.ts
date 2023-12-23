export interface City {
  name: string;
  lat: string;
  lng: string;
  population: number;
  foundedAt?: string;
  religion?: 'יהודי' | 'ערבי מוסלמי' | 'ערבי נוצרי' | 'דרוזי';
  trivia?: string;
}
