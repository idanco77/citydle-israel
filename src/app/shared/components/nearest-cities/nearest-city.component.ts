import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import {haversineFormula} from 'src/app/shared/consts/haversineFormula.const';
import {City, CityOver10K} from 'src/app/shared/models/city.model';
import {NearestCityGuess} from 'src/app/shared/models/nearest-city-guess.model';
import {GoogleMap} from '@angular/google-maps';
import {GoogleMapService} from 'src/app/shared/services/google-map.service';
import {Observable} from 'rxjs';
import {MAP_SETTINGS} from 'src/app/shared/consts/map-settings.const';
import {LEVELS} from 'src/app/shared/consts/steps.const';
import {IsGameOverService} from 'src/app/shared/services/is-game-over.service';
import {startConfetti} from 'src/app/shared/consts/confetti.const';

@Component({
  selector: 'app-nearest-city',
  templateUrl: 'nearest-city.component.html',
  styleUrls: ['nearest-city.component.scss']
})
export class NearestCityComponent implements OnInit {
  @Input() mysteryCity: CityOver10K;
  @Input() citiesOver10k: CityOver10K[];
  @Input() step: number;
  @ViewChild('googleMap') googleMap: GoogleMap;

  protected readonly faCheck = faCheck;
  protected readonly faX = faX;
  isMobile = window.innerWidth < 500;
  guesses: NearestCityGuess[] = [];
  nearestCities: CityOver10K[];
  guess = 0;
  isGameOver: boolean = false;
  isWin = false;
  nearestCitiesMarkers: any = [];
  mapWidth = this.isMobile ? '35rem' : '45rem';
  apiLoaded: Observable<boolean>;
  mapSettings: google.maps.MapOptions;

  constructor(private googleMapService: GoogleMapService,
              private isGameOverService: IsGameOverService) {
    this.apiLoaded = this.googleMapService.apiLoaded();
  }

  ngOnInit() {
    this.mapSettings = MAP_SETTINGS;
    this.guesses = JSON.parse(localStorage.getItem('nearestCitiesGuesses') || '[]');
    this.nearestCities = JSON.parse(localStorage.getItem('nearestCities') || '[]');
    this.guess = +(localStorage.getItem('nearestCitiesGuessesIndex') ?? 0);
    this.nearestCitiesMarkers = JSON.parse(localStorage.getItem('nearestCitiesMarkers') || '[]');
    this.addMysteryCityMarker();
    this.setNearestCities();
    this.checkIsGameOver();
    this.setGuesses();
    this.checkIsWin();
  }

  private setGuesses() {
    if (this.guesses.length) {
      return;
    }
    this.guesses = Array.from({length: 8}, () => ({
      name: null,
      isCorrect: null
    }))
  }

  handleSelection(selectedCity: string | null) {
    if (this.isGameOver) {
      return;
    }
    const cityObj = this.citiesOver10k.find(city => city.name === selectedCity);
    if (! cityObj) {
      return;
    }
    this.addMarker(cityObj);

    const city = this.nearestCities.find(city => selectedCity === city.name);
    if (city) {
      city.isCorrect = true;
    }
    this.guesses[this.guess] = {name: selectedCity, isCorrect: !!city};
    this.guess++;
    localStorage.setItem('nearestCities', JSON.stringify(this.nearestCities));
    localStorage.setItem('nearestCitiesGuesses', JSON.stringify(this.guesses));
    localStorage.setItem('nearestCitiesGuessesIndex', JSON.stringify(this.guess));
    localStorage.setItem('nearestCitiesMarkers', JSON.stringify(this.nearestCitiesMarkers));
    this.checkIsGameOver();
    this.checkIsWin();

    if (this.isWin) {
      startConfetti();
    }

    if (this.isGameOver && ! this.isWin) {
      this.nearestCities.forEach(city => {
        this.addMarker(city);
      });
    }

    if (this.isGameOver && this.step === LEVELS.length - 1) {
      this.isGameOverService.isGameOver.next(true);
    }
  }

  private setNearestCities() {
    if (this.nearestCities.length) {
      return;
    }
    this.citiesOver10k.forEach((city: City) => {
      city.distance = haversineFormula(this.mysteryCity.lat, this.mysteryCity.lng, city.lat, city.lng, 'meters');
    });
    this.nearestCities = this.citiesOver10k.sort((a, b) => a.distance as number - (b.distance as number))
      .slice(1, 5);
  }

  private checkIsGameOver() {
    if (this.guess === 8) {
      this.isGameOver = true;
    }
  }

  private checkIsWin() {
    const filterGuesses = this.guesses.filter(guess => guess.name);
    if (!filterGuesses.length) {
      this.isWin = false;
      return;
    }
    this.isWin = filterGuesses.filter(guess => guess.isCorrect).length === 4;
    if (this.isWin) {
      this.isGameOver = true;
    }
  }

  private addMysteryCityMarker() {
    if (this.nearestCitiesMarkers.length) {
      return;
    }
    this.addMarker(this.mysteryCity)
  }

  private addMarker(cityObj: CityOver10K) {
    this.nearestCitiesMarkers.push({
      position: {lat: cityObj.lat, lng: cityObj.lng},
      options: {draggable: false},
      label: {text:cityObj.name},
    });
  }
}
