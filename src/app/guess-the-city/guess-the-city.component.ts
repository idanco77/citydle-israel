import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {bounceInLeftOnEnterAnimation} from 'angular-animations';
import {LEVELS, Levels} from 'src/app/shared/consts/steps.const';
import {RangeAnswer} from 'src/app/shared/models/range-answer.model';
import {TextAnswer} from 'src/app/shared/models/text-answer.model';
import {City, CityOver10K} from 'src/app/shared/models/city.model';
import {GoogleMap} from '@angular/google-maps';
import {AutocompleteCityComponent} from 'src/app/shared/components/autocomplete-city/autocomplete-city.component';
import {CITIES} from 'src/app/shared/consts/cities.const';
import {Guess} from 'src/app/shared/models/guess.model';
import {filter, interval, Observable, Subscription, takeWhile} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ErrorMessageService} from 'src/app/shared/services/error-message.service';
import {StateService} from 'src/app/shared/services/state.service';
import {GoogleMapService} from 'src/app/shared/services/google-map.service';
import {OverlayContainer} from '@angular/cdk/overlay';
import {DARK, LIGHT, MAP_SETTINGS} from 'src/app/shared/consts/map-settings.const';
import {createMarker} from 'src/app/shared/consts/createMarker.const';
import {haversineFormula} from 'src/app/shared/consts/haversineFormula.const';
import {startConfetti} from 'src/app/shared/consts/confetti.const';
import {START_DATE} from 'src/app/shared/consts/start-date.const';
import {directions} from 'src/app/shared/types/directions.type';
import {calculateHeading} from 'src/app/shared/consts/headingFormula.const';
import {getCurrentDateYyyyMmDd} from 'src/app/shared/consts/get-current-date-yyyy-mm-dd.const';
import {createAnswers, createRanges} from 'src/app/shared/consts/create-number-range.const';
import {ResultsDialogComponent} from 'src/app/results-dialog/results-dialog.component';
import { faLightbulb, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import {Marker} from 'src/app/shared/models/marker.model';
import {HelpersService} from 'src/app/shared/services/helpers.service';

@Component({
  selector: 'app-guess-the-city',
  templateUrl: './guess-the-city.component.html',
  styleUrls: ['./guess-the-city.component.scss'],
  animations: [
    bounceInLeftOnEnterAnimation({ anchor: 'enter', duration: 1000, delay: 100, translate: '300px' })]

})
export class GuessTheCityComponent implements OnInit, OnDestroy {
  @ViewChild('googleMap') googleMap: GoogleMap;
  @ViewChild(AutocompleteCityComponent) autocompleteCity: AutocompleteCityComponent;
  @HostBinding('class') className = '';

  protected readonly GUESSES_LEVEL = Levels.GUESSES;
  protected readonly POPULATION_LEVEL = Levels.POPULATION;
  protected readonly AREA_LEVEL = Levels.AREA;
  protected readonly FOUNDED_YEAR_LEVEL = Levels.FOUNDED_YEAR;
  protected readonly NEAREST_CITY_LEVEL = Levels.NEAREST_CITY;
  protected readonly LAST_LEVEL = LEVELS.length - 1;
  protected readonly faLightbulb = faLightbulb;
  protected readonly faSackDollar = faSackDollar;

  cities: City[] = [... CITIES];

  guesses: Guess[];
  currentGuess = 0;
  mysteryCity: CityOver10K;
  mapSettings: google.maps.MapOptions;
  markers: any = [];
  isWin: boolean = false;
  isShowClue = false;
  mapWidth = this.stateService.getMapWidth();

  step: number = this.GUESSES_LEVEL;
  rangeAnswers: RangeAnswer[];
  citiesOver10k: CityOver10K[];
  isShow = true;
  private subs = new Subscription();
  private isMysteryCityGradeAdded: boolean = false;
  private isDarkMode = false;
  clueLevel: number = 0;
  apiLoaded: Observable<boolean>;

  constructor(private dialog: MatDialog,
              private errorMessageService: ErrorMessageService,
              private stateService: StateService,
              private googleMapService: GoogleMapService,
              private helpers: HelpersService) {
    this.apiLoaded = this.googleMapService.apiLoaded();
  }

  get isGameOver() {
    return this.isWin || this.currentGuess === 6;
  };

  ngOnInit() {
    const date = localStorage.getItem('date');
    if (date && date !== this.helpers.getCurrentDateInUTC()) {
      localStorage.removeItem('step');
      location.reload();
    }
    this.mapSettings = MAP_SETTINGS;

    this.setGuesses();
    this.setMysteryCity();

    this.manageLocalStorage();
    this.openResultsDialog();

    this.subs.add(this.stateService.toggleDarkMode.subscribe(isDarkMode => {
      this.toggleDarkMode(isDarkMode);
    }));

    this.initializeMap$().subscribe(() => {
      const isDarkMode = localStorage.getItem('isDarkMode') === '1';
      this.toggleDarkMode(isDarkMode);
    });
  }

  initializeMap$(): Observable<number> {
    return interval(100).pipe(
      filter(() => !!this.googleMap), // Emit only when googleMap is truthy
      takeWhile(() => !this.googleMap, true) // Continue emitting until googleMap is truthy
    );
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
      this.errorMessageService.showErrorMessage();
      return;
    }

    if (this.isGameOver) {
      return;
    }
    this.cities = this.cities.filter(city => city.name !== selectedCity);
    this.isWin = this.checkIsWin(city.name);
    const marker: Marker = {lat: city.lat, lng: city.lng, name: city.name};
    this.markers.push(createMarker(marker, this.isWin ? 'green' : 'red', this.isDarkMode));
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
      let grade = this.calculateGrade();
      this.stateService.addGrade(grade);
      if (!this.isWin) {
        setTimeout(() => {
          const marker: Marker = {
            lat: this.mysteryCity.lat,
            lng: this.mysteryCity.lng,
            name: this.mysteryCity.name
          }
          this.markers.push(createMarker(marker, 'green', this.isDarkMode));
        }, 1500);
      } else {
        this.saveHistory();
      }
      this.setSuccessRate();
      this.setTotalPlayedGames();

      this.autocompleteCity.autocompleteControl.disable();
      if (this.isWin) {
        startConfetti();
      }
    }

    localStorage.setItem('date', this.helpers.getCurrentDateInUTC());
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
    this.mysteryCity = citiesOver10k[this.helpers.getDifferenceInDays((new Date(START_DATE)), new Date(new Date()))];
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

  private manageLocalStorage() {
    const step: string | null = localStorage.getItem('step');
    this.step = step ? +step : Levels.GUESSES;
    const currentGuess = localStorage.getItem('currentGuess');
    const markers = JSON.parse(localStorage.getItem('markers') || '[]');
    const guesses = JSON.parse(localStorage.getItem('guesses') || '[]');
    if (currentGuess && markers && guesses) {
      this.guesses = guesses;
      this.markers = markers;
      this.currentGuess = +currentGuess;
      this.isWin = this.checkIsWin(this.guesses[this.currentGuess - 1].name as string);
    }
  }

  private checkIsWin(cityName: string) {
    return cityName === this.mysteryCity.name
  }

  showClue() {
    if (this.clueLevel === 2) {
      this.isShowClue = !this.isShowClue;
      return;
    }
    this.isShowClue = true;
    this.clueLevel++;
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

  navigateBetweenSteps(isUp: boolean) {
    this.isShow = false;
    isUp ? this.step++ : this.step--;

    if (this.step === this.POPULATION_LEVEL) {
      let data;
      if (this.mysteryCity.population >= 100000) {
        data = createRanges(10000, 1200000, 25000);
      } else {
        data = createRanges(10000, 1000000, 15000);
      }
      this.rangeAnswers = createAnswers(this.mysteryCity.population, data);
    }

    if (this.step === this.AREA_LEVEL) {
      let data;
      if (this.mysteryCity.area >= 20000) {
        data = createRanges(10000, 300000, 20000);
      } else {
        data = createRanges(0, 250000, 3000);
      }
      this.rangeAnswers = createAnswers(this.mysteryCity.area, data);
    }

    if (this.step === this.FOUNDED_YEAR_LEVEL) {
      if (!this.mysteryCity.foundedAt) {
        this.isMysteryCityGradeAdded = !!localStorage.getItem('isMysteryCityGradeAdded');
        if (!this.isMysteryCityGradeAdded) {
          this.stateService.addGrade(2);
          this.isMysteryCityGradeAdded = true;
          localStorage.setItem('isMysteryCityGradeAdded', '1');
        }
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

    setTimeout(() => {    this.isShow = true;}, 20)
    localStorage.setItem('step', this.step.toString());
  }

  private openResultsDialog() {
    this.subs.add(this.stateService.isGameOver.subscribe(isGameOver => {
      if (isGameOver) {
        setTimeout(() => {
          this.dialog.open(ResultsDialogComponent, {
            width: '650px',
            data: {isDarkMode: this.isDarkMode}
          });
        }, 3000);
      }
    }));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  setMapOptions(): void {
    if (this.googleMap) {
      if (this.isDarkMode) {
        this.googleMap.googleMap?.setOptions({styles: DARK});
        this.resetMarkers(true);
      } else {
        this.googleMap.googleMap?.setOptions({styles: LIGHT});
        this.resetMarkers(false);
      }
    }
  }


  toggleDarkMode(isDarkMode: boolean): void {
    this.isDarkMode = isDarkMode;
    this.setMapOptions();
  }

  private resetMarkers(isDarkMode: boolean): void {
    const markers = JSON.parse(localStorage.getItem('markers') || '[]');
    if (markers) {
      this.markers = this.helpers.getMarkers(markers, isDarkMode);
    }
  }

  private calculateGrade(): number {
    if (!this.isWin) {
      return 0;
    }

    if (this.currentGuess <= 3) {
      return 2;
    }

    return 1;
  }

}
