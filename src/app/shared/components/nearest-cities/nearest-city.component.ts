import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import {haversineFormula} from 'src/app/shared/consts/haversineFormula.const';
import {City, CityOver10K} from 'src/app/shared/models/city.model';
import {NearestCityGuess} from 'src/app/shared/models/nearest-city-guess.model';
import {GoogleMap} from '@angular/google-maps';
import {GoogleMapService} from 'src/app/shared/services/google-map.service';
import {Observable, Subscription} from 'rxjs';
import {StateService} from 'src/app/shared/services/state.service';
import {startConfetti} from 'src/app/shared/consts/confetti.const';
import {ErrorMessageService} from 'src/app/shared/services/error-message.service';
import {createMarker} from 'src/app/shared/consts/createMarker.const';
import {DARK, LIGHT, MAP_SETTINGS} from 'src/app/shared/consts/map-settings.const';

@Component({
  selector: 'app-nearest-city',
  templateUrl: 'nearest-city.component.html',
  styleUrls: ['nearest-city.component.scss']
})
export class NearestCityComponent implements OnInit, OnDestroy, OnChanges {
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
  nearestCitiesMarkers: any[] = [];
  mapWidth = this.isMobile ? '35rem' : '45rem';
  apiLoaded: Observable<boolean>;
  mapSettings: google.maps.MapOptions;
  protected readonly MAX_GUESSES = 7;
  subs = new Subscription();
  grade = 0;

  constructor(private googleMapService: GoogleMapService,
              private stateService: StateService,
              private errorMessageService: ErrorMessageService) {
    this.apiLoaded = this.googleMapService.apiLoaded();
  }

  ngOnChanges() {
    if (localStorage.getItem('isDarkMode') === '1') {
      this.toggleDarkMode(true);
    }
  }

  ngOnInit() {
    this.mapSettings = MAP_SETTINGS;
    this.guesses = JSON.parse(localStorage.getItem('nearestCitiesGuesses') || '[]');
    this.nearestCities = JSON.parse(localStorage.getItem('nearestCities') || '[]');
    this.guess = +(localStorage.getItem('nearestCitiesGuessesIndex') ?? 0);
    this.nearestCitiesMarkers = JSON.parse(localStorage.getItem('nearestCitiesMarkers') || '[]');
    this.addMysteryCityMarker();
    this.removeMysteryCityFromList();
    this.setNearestCities();
    this.checkIsGameOver();
    this.setGuesses();
    this.checkIsWin();

    this.subs.add(this.stateService.toggleDarkMode.subscribe(isDarkMode => {
      this.toggleDarkMode(isDarkMode);
    }));
  }

  private setGuesses() {
    if (this.guesses.length) {
      return;
    }
    this.guesses = Array.from({length: this.MAX_GUESSES}, () => ({
      name: null,
      isCorrect: null
    }))
  }

  handleSelection(selectedCity: string | null) {
    const cityOver10K = this.citiesOver10k.find(city => city.name === selectedCity) as CityOver10K;
    if (! selectedCity || ! cityOver10K) {
      this.errorMessageService.showErrorMessage();
      return;
    }
    if (this.isGameOver) return;

    const cityObj = this.citiesOver10k.find(city => city.name === selectedCity);
    if (! cityObj) {
      return;
    }
    this.citiesOver10k = this.citiesOver10k.filter(city => city.name !== selectedCity);

    const city = this.nearestCities.find(city => selectedCity === city.name);
    if (city) {
      city.isCorrect = true;
      this.grade += 0.5;
    }
    this.guesses[this.guess] = {name: selectedCity, isCorrect: !!city};
    this.guess++;
    this.checkIsGameOver();
    this.checkIsWin();
    this.nearestCitiesMarkers.push(createMarker(cityObj, cityObj.isCorrect));
    if (this.isWin) {
      startConfetti();
    }

    if (this.isGameOver) {
      this.stateService.addGrade(this.grade);

      const guesses = new Set(this.guesses.map(item => item.name));
      const nearestCities = this.nearestCities.filter(item => !guesses.has(item.name));
      if (! this.isWin) {
        nearestCities.forEach(city => {
          this.nearestCitiesMarkers.push(createMarker(city, true));
        });
      }
    }

    localStorage.setItem('nearestCities', JSON.stringify(this.nearestCities));
    localStorage.setItem('nearestCitiesGuesses', JSON.stringify(this.guesses));
    localStorage.setItem('nearestCitiesGuessesIndex', JSON.stringify(this.guess));
    localStorage.setItem('nearestCitiesMarkers', JSON.stringify(this.nearestCitiesMarkers));
  }

  private setNearestCities() {
    if (this.nearestCities.length) {
      return;
    }
    this.citiesOver10k.forEach((city: City) => {
      city.distance = haversineFormula(this.mysteryCity.lat, this.mysteryCity.lng, city.lat, city.lng, 'meters');
    });
    this.nearestCities = this.citiesOver10k.sort((a, b) => a.distance as number - (b.distance as number))
      .slice(0, 4);
  }

  private checkIsGameOver() {
    if (this.guess === this.MAX_GUESSES) {
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
    this.nearestCitiesMarkers.push(createMarker(this.mysteryCity, false));
  }

  private removeMysteryCityFromList(): void {
    this.citiesOver10k = this.citiesOver10k.filter(city => city.name !== this.mysteryCity.name);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private toggleDarkMode(isDarkMode: boolean) {
    setTimeout(() => {
      if (isDarkMode) {
        if(this.googleMap !== undefined){
          this.googleMap.googleMap?.setOptions({styles: DARK});
          this.resetMarkers(isDarkMode);
        }
      } else {
        if(this.googleMap !== undefined){
          this.googleMap.googleMap?.setOptions({styles: LIGHT});
          this.resetMarkers(isDarkMode);
        }
      }
    }, 400);
  }

  private resetMarkers(isDarkMode: boolean): void {
    const markers = JSON.parse(localStorage.getItem('nearestCitiesMarkers') || '[]');
    if (markers) {
      markers.forEach((marker: any) => {
        marker.label.color = isDarkMode ? 'white' : 'black';
        this.nearestCitiesMarkers.push(marker);
      })
    }
  }

}