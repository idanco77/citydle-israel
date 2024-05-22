import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {City, CityOver10K} from 'src/app/shared/models/city.model';
import {Observable} from 'rxjs';
import {Guess} from 'src/app/shared/models/guess.model';
import {haversineFormula} from 'src/app/shared/consts/haversineFormula.const';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GoogleMap} from '@angular/google-maps';
import {MatDialog} from '@angular/material/dialog';
import {DOCUMENT} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';
import {START_DATE} from 'src/app/shared/consts/start-date.const';
import {faLightbulb, faMugHot, faSackDollar} from '@fortawesome/free-solid-svg-icons';
import {getCurrentDateYyyyMmDd} from 'src/app/shared/consts/get-current-date-yyyy-mm-dd.const';
import {directions} from 'src/app/shared/types/directions.type';
import {createAnswers, createRanges, shuffleArray} from 'src/app/shared/consts/create-number-range.const';
import {Levels, LEVELS} from 'src/app/shared/consts/steps.const';
import {RangeAnswer} from 'src/app/shared/models/range-answer.model';
import {TextAnswer} from 'src/app/shared/models/text-answer.model';
import {getRandomElements} from 'src/app/shared/consts/get-random-element.const';
import {IsGameOverService} from 'src/app/shared/services/is-game-over.service';
import {ResultDialogComponent} from 'src/app/result-dialog/result-dialog.component';
import { bounceInLeftOnEnterAnimation } from 'angular-animations';
import {calculateHeading} from 'src/app/shared/consts/headingFormula.const';

import {CITIES} from 'src/app/shared/consts/cities.const';
import {AutocompleteCityComponent} from 'src/app/shared/components/autocomplete-city/autocomplete-city.component';
import {GoogleMapService} from 'src/app/shared/services/google-map.service';
import {MAP_SETTINGS} from 'src/app/shared/consts/map-settings.const';
import {startConfetti} from 'src/app/shared/consts/confetti.const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    bounceInLeftOnEnterAnimation({ anchor: 'enter', duration: 1000, delay: 100, translate: '300px' })]
})
export class AppComponent implements OnInit {
  protected readonly isMobile = window.innerWidth < 500;
  protected readonly GUESSES_LEVEL = Levels.GUESSES;
  protected readonly POPULATION_LEVEL = Levels.POPULATION;
  protected readonly AREA_LEVEL = Levels.AREA;
  protected readonly FOUNDED_YEAR_LEVEL = Levels.FOUNDED_YEAR;
  protected readonly TRIVIA_LEVEL = Levels.TRIVIA;
  protected readonly SISTER_LEVEL = Levels.SISTER;
  protected readonly NEAREST_CITY_LEVEL = Levels.NEAREST_CITY;
  protected readonly LAST_LEVEL = LEVELS.length - 1;

  step: number = this.GUESSES_LEVEL;
  rangeAnswers: RangeAnswer[];
  textAnswers: TextAnswer[];
  citiesOver10k: CityOver10K[];

  @ViewChild('googleMap') googleMap: GoogleMap;
  @ViewChild(AutocompleteCityComponent) autocompleteCity: AutocompleteCityComponent;

  cities: City[] = CITIES;

  guesses: Guess[];
  currentGuess = 0;
  mysteryCity: CityOver10K;
  mapSettings: google.maps.MapOptions;
  markers: any = [];
  isWin: boolean = false;
  apiLoaded: Observable<boolean>;
  isShowClue = false;
  mapWidth = this.isMobile ? '35rem' : '45rem';
  protected readonly faLightbulb = faLightbulb;
  protected readonly faSackDollar = faSackDollar;

  protected readonly faMugHot = faMugHot;
  isShow = true;

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private dialog: MatDialog, @Inject(DOCUMENT) private document: Document,
              private isGameOverService: IsGameOverService,
              private googleMapService: GoogleMapService) {
    this.handleRouteEvents();
    this.apiLoaded = this.googleMapService.apiLoaded();
  }

  get isGameOver() {
    return this.isWin || this.currentGuess === 6;
  };

  handleRouteEvents() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('event', 'page_view', {
          page_title: 'home',
          page_path: event.urlAfterRedirects,
          page_location: this.document.location.href
        })
      }
    });
  }

  ngOnInit() {
    const date = localStorage.getItem('date');
    if (date && date !== this.getCurrentDateInUTC()) {
      localStorage.removeItem('step');
      location.reload();
    }
    this.mapSettings = MAP_SETTINGS;

    this.setGuesses();
    this.setMysteryCity();

    this.manageLocalStorage();
    this.openResultsDialog();
  }

  calculatePercentages(distance: number): number {
    if (this.isWin) return 100;
    const israelNorthSouthDistanceKm = 435;

    let percentage = Math.floor(100 - (distance / israelNorthSouthDistanceKm * 100));
    if (percentage === 100) {
      percentage = 99;
    }
    return percentage;
  }


  handleSelection(selectedCity: null | string) {
    const city = this.cities.find(city => city.name === selectedCity) as City;
    if (! selectedCity || ! city) {
      this.showErrorMessage();
      return;
    }

    if (this.isWin || this.currentGuess > 5) {
      return;
    }

    this.isWin = this.checkIsWin(city.name);
    this.markers.push({
      position: {lat: city.lat, lng: city.lng},
      options: {animation: this.isWin ? google.maps.Animation.BOUNCE : null, draggable: false},
      label: {
        text: city.name,
      },
    });
    this.guesses[this.currentGuess].name = city.name;
    const distance = haversineFormula(
      this.mysteryCity.lat, this.mysteryCity.lng, city.lat, city.lng
    );

    this.guesses[this.currentGuess].distance = distance;
    this.guesses[this.currentGuess].percentage = this.calculatePercentages(distance);
    this.guesses[this.currentGuess].direction = this.getHeading(
      this.mysteryCity.lat, this.mysteryCity.lng, city.lat, city.lng
    );
    this.currentGuess++;
    if (this.isGameOver) {
      if (!this.isWin) {
        this.markers.push({
          position: {lat: this.mysteryCity.lat, lng: this.mysteryCity.lng},
          options: {animation: 0.0, draggable: false},
          label: {
            text: this.mysteryCity.name,
          },
        });
      } else {
        this.saveHistory();
      }
      this.setSuccessRate();
      this.setTotalPlayedGames();

      this.autocompleteCity.autocompleteControl.disable();
        startConfetti();
    }
    localStorage.setItem('date', this.getCurrentDateInUTC());
    localStorage.setItem('guesses', JSON.stringify(this.guesses));
    localStorage.setItem('markers', JSON.stringify(this.markers));
    localStorage.setItem('currentGuess', JSON.stringify(this.currentGuess));
  }

  private setGuesses() {
    this.guesses = Array.from({length: 6}, () => ({
        distance: null,
        name: null,
        percentage: null,
        direction: null
      }))
  }

  private setMysteryCity(): void {
    this.citiesOver10k = this.cities.filter(city => city.population >= 10000) as CityOver10K[];
    const citiesOver10k = [...this.citiesOver10k, ...this.citiesOver10k, ...this.citiesOver10k, ...this.citiesOver10k, ...this.citiesOver10k, ...this.citiesOver10k, ...this.citiesOver10k, ...this.citiesOver10k, ...this.citiesOver10k, ...this.citiesOver10k, ...this.citiesOver10k, ...this.citiesOver10k];
    this.mysteryCity = citiesOver10k[this.getDifferenceInDays((new Date(START_DATE)), new Date(new Date()))];
  }

  getDifferenceInDays(firstDate: Date, today: Date) {
    const num  = new Date(today).setHours(0, 0, 0, 0) - firstDate.setHours(0, 0, 0, 0);
    return Math.round(num / 864e5);
  }

  private getHeading(mysteryLat: number, mysteryLng: number, guessLat: number, guessLng: number): directions | null {
    if (this.isWin) {
      return '🏆';
    }
    const heading = calculateHeading(guessLat, guessLng, mysteryLat, mysteryLng);
    const directions: {limit: number, direction: directions}[] = [
      { limit: -157.5, direction: '⬇️' },
      { limit: 22.5, direction: '⬆️' },
      { limit: 67.5, direction: '↗️' },
      { limit: -112.5, direction: '↙️' },
      { limit: 112.5, direction: '➡️' },
      { limit: 157.5, direction: '↘️' },
      { limit: -67.5, direction: '⬅️' },
      { limit: -22.5, direction: '↖️' },
      { limit: 180, direction: '⬇️' }
    ];

    directions.sort((a, b) => a.limit - b.limit);

    for (const { limit, direction } of directions) {
      if (heading <= limit) {
        return direction;
      }
    }
    return null;
  }

  private getCurrentDateInUTC(): string {
    const currentDate = new Date();
    const offsetInMinutes = currentDate.getTimezoneOffset();
    const utcDate = new Date(currentDate.getTime() - offsetInMinutes * 60 * 1000);

    return utcDate.toISOString().split('T')[0];
  }

  private manageLocalStorage() {
    const step: string | null = localStorage.getItem('step');
    this.step = step ? +step : Levels.GUESSES;
    const date = localStorage.getItem('date');
    if (date && date !== this.getCurrentDateInUTC()) {
      this.clearDailyData();
    }
    const currentGuess = localStorage.getItem('currentGuess');
    const markers = JSON.parse(localStorage.getItem('markers') || '[]');
    const guesses = JSON.parse(localStorage.getItem('guesses') || '[]');
    if (currentGuess && markers && guesses) {
      this.guesses = guesses;
      this.markers = markers;
      this.currentGuess = +currentGuess;
      this.isWin = this.checkIsWin(this.guesses[this.currentGuess - 1].name as string);
    } else {
      this.clearDailyData();
    }
  }

  private showErrorMessage() {
    this.snackBar.open('יישוב לא ידוע', 'X', {
      duration: 1500,
      verticalPosition: 'top'
    });
  }

  private checkIsWin(cityName: string) {
    return cityName === this.mysteryCity.name
  }

  showClue() {
    this.isShowClue = !this.isShowClue;
  }

  private saveHistory(): void {
    const history = JSON.parse((localStorage.getItem('history') || '[]'));
    history.push(getCurrentDateYyyyMmDd());
    localStorage.setItem('history', JSON.stringify(history));
  }

  private setSuccessRate(): void {
    const successRate: number[] = JSON.parse(localStorage.getItem('successRate') || '[]');
    successRate.push(+this.isWin);
    localStorage.setItem('successRate', JSON.stringify(successRate));
  }

  private setTotalPlayedGames() {
    const totalPlayedGames = +(localStorage.getItem('totalPlayedGames') ?? 0) + 1;
    localStorage.setItem('totalPlayedGames', JSON.stringify(totalPlayedGames));
  }

  private clearDailyData(): void {
    const itemKeys = ['date', 'currentGuess', 'markers', 'guesses',
      'population', 'area', 'foundedAt', 'trivia', 'sisterCities', 'step',
      'nearestCities', 'nearestCitiesGuesses', 'nearestCitiesGuessesIndex',
      'nearestCitiesMarkers'
    ];

      itemKeys.forEach(item => {localStorage.removeItem(item);});
  }

  navigateBetweenSteps(isUp: boolean) {
    this.isShow = false;
    isUp ? this.step++ : this.step--;

    if (this.step === this.POPULATION_LEVEL) {
      let data;
      if (this.mysteryCity.population >= 100000) {
        data = createRanges(10000, 1200000, 25000);
      } else {
        data = createRanges(10000, 1000000, 5000);
      }
      this.rangeAnswers = createAnswers(this.mysteryCity.population, data);
    }

    if (this.step === this.AREA_LEVEL) {
      let data;
      if (this.mysteryCity.area >= 100000) {
        data = createRanges(10000, 300000, 20000);
      } else {
        data = createRanges(0, 250000, 3000);
      }
      this.rangeAnswers = createAnswers(this.mysteryCity.area, data);
    }

    if (this.step === this.FOUNDED_YEAR_LEVEL) {
      if (!this.mysteryCity.foundedAt) {
        this.navigateBetweenSteps(isUp);
        return;
      }
        let data;
        if (this.mysteryCity.foundedAt < 1900) {
          data = createRanges(1500, 2000, 100);
        } else {
          data = createRanges(1500, 2024, 10);
        }
        this.rangeAnswers = createAnswers(this.mysteryCity.foundedAt, data);
    }

    if (this.step === this.TRIVIA_LEVEL) {
      let citiesWithoutMysteryCity = [...this.citiesOver10k];
      citiesWithoutMysteryCity = citiesWithoutMysteryCity.filter(city => city.name !== this.mysteryCity.name);
      this.textAnswers = getRandomElements(citiesWithoutMysteryCity, 'trivia');
      this.textAnswers.push({text: this.mysteryCity.trivia, isCorrect: true});
      shuffleArray(this.textAnswers);
    }

    if (this.step === this.SISTER_LEVEL) {
      if (!this.mysteryCity.sisterCities) {
        this.navigateBetweenSteps(isUp);
        return;
      }
      let citiesWithoutMysteryCity = [...this.citiesOver10k];
      citiesWithoutMysteryCity = citiesWithoutMysteryCity.filter(city => city.name !== this.mysteryCity.name);
      const citiesWithSisterCity = citiesWithoutMysteryCity.filter(city => city.sisterCities);
      this.textAnswers = getRandomElements(citiesWithSisterCity, 'sisterCities');
      this.textAnswers.push({text: this.mysteryCity.sisterCities , isCorrect: true});
      shuffleArray(this.textAnswers);
    }
    setTimeout(() => {    this.isShow = true;}, 20)
    localStorage.setItem('step', this.step.toString());
  }

  private openResultsDialog() {
    this.isGameOverService.isGameOver.subscribe(isGameOver => {
      if (isGameOver) {
        setTimeout(() => {
          this.dialog.open(ResultDialogComponent, {
            width: '800px',
            data: {
              city: this.mysteryCity,
              guesses: this.guesses,
              isGameOver: this.isGameOver
            }
          });
        }, 2500);
      }
    });
  }

  protected readonly startConfetti = startConfetti;
}

