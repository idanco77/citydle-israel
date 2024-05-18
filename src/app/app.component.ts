import {Component, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {City, CityOver10K} from 'src/app/shared/models/city.model';
import {CITIES} from 'src/app/shared/consts/cities.const';
import {catchError, map, Observable, of, startWith} from 'rxjs';
import {FormControl} from '@angular/forms';
import {Guess} from 'src/app/shared/models/guess.model';
import {haversineFormula} from 'src/app/shared/consts/haversineFormula.const';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GoogleMap} from '@angular/google-maps';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {MatDialog} from '@angular/material/dialog';
import {DOCUMENT} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';
import {START_DATE} from 'src/app/shared/consts/start-date.const';
import {
  faCalendarDays,
  faCircleChevronLeft,
  faCircleChevronRight, faCity, faClipboardQuestion, faGlobe,
  faLightbulb, faMagnifyingGlass, faMapLocation, faMugHot, faSackDollar, faUsers
} from '@fortawesome/free-solid-svg-icons';
import {getCurrentDateYyyyMmDd} from 'src/app/shared/consts/get-current-date-yyyy-mm-dd.const';
import {directions} from 'src/app/shared/types/directions.type';
import {createAnswers, createRanges, shuffleArray} from 'src/app/shared/consts/create-number-range.const';
import {
  AREA_LEVEL,
  GUESSES_LEVEL,
  POPULATION_LEVEL,
  LEVELS,
  FOUNDED_YEAR_LEVEL, TRIVIA_LEVEL, SISTER_LEVEL
} from 'src/app/shared/consts/steps.const';
import {RangeAnswer} from 'src/app/shared/models/range-answer.model';
import {TextAnswer} from 'src/app/shared/models/text-answer.model';
import {getRandomElements} from 'src/app/shared/consts/get-random-element.const';
import {IsGameOverService} from 'src/app/shared/services/is-game-over.service';
import {ResultDialogComponent} from 'src/app/result-dialog/result-dialog.component';
import { bounceInLeftOnEnterAnimation, pulseOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ pulseOnEnterAnimation(),
    bounceInLeftOnEnterAnimation({ anchor: 'enter', duration: 1000, delay: 100, translate: '300px' })]
})
export class AppComponent implements OnInit {
  isMobile = window.innerWidth < 500;
  shouldStartFireworks = false;
  GUESSES_LEVEL = GUESSES_LEVEL;
  POPULATION_LEVEL = POPULATION_LEVEL;
  AREA_LEVEL = AREA_LEVEL;
  FOUNDED_YEAR_LEVEL = FOUNDED_YEAR_LEVEL;
  TRIVIA_LEVEL = TRIVIA_LEVEL;
  SISTER_LEVEL = SISTER_LEVEL;
  lastLevel = LEVELS.length - 1;
  step: number = this.GUESSES_LEVEL;
  rangeAnswers: RangeAnswer[];
  textAnswers: TextAnswer[];
  private citiesOver10k: CityOver10K[];

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    this.autoSelectionOnEnterKey(event.key);
  }
  @ViewChild('googleMap') googleMap: GoogleMap;
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger | undefined;

  cities: City[];
  filteredCities: Observable<City[]>;
  autocompleteControl: FormControl<string | null> = new FormControl('');
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
  protected readonly faMagnifyingGlass = faMagnifyingGlass;
  protected readonly faCircleChevronLeft = faCircleChevronLeft;
  protected readonly faCircleChevronRight = faCircleChevronRight;
  protected readonly faMugHot = faMugHot;
  protected readonly faUsers = faUsers;
  protected readonly faMapLocation = faMapLocation;
  protected readonly faCalendarDays = faCalendarDays;
  protected readonly faClipboardQuestion = faClipboardQuestion;
  protected readonly faGlobe = faGlobe;
  protected readonly faCity = faCity;
  isShow = true;

  constructor(private snackBar: MatSnackBar, httpClient: HttpClient,
              private router: Router,
              private dialog: MatDialog, @Inject(DOCUMENT) private document: Document,
              private isGameOverService: IsGameOverService) {
    this.handleRouteEvents();
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=' + environment.apiKey + '&libraries=geometry', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
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
    this.mapSettings = {
      center: {lat: 31.496931, lng: 34.994928},
      zoom: 7.5,
      streetViewControl: false,
      disableDefaultUI: true,
      scrollwheel: true,
      fullscreenControl: false,
      mapTypeControl: false,
      zoomControl: false,
      styles: [
        { elementType: 'labels', stylers: [{visibility: 'off'}] },
        { featureType: 'administrative.locality', stylers: [{visibility: 'off'}] }
      ]
    }

    this.cities = CITIES;
    this.setGuesses();
    this.setMysteryCity();
    this.initAutocomplete();
    this.manageLocalStorage();
    this.openResultsDialog();
  }

  private initAutocomplete(): void {
    this.filteredCities = this.autocompleteControl.valueChanges.pipe(
      startWith(''),
      map(value => this.cities.sort((a, b) => 0.5 - Math.random()).filter(
        option => option.name.includes(value || '')
      )),
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
    this.autocompleteControl.reset();
    this.autocomplete?.closePanel();
    if (this.isGameOver) {
      if (!this.isWin) {
        this.markers.push({
          position: {lat: this.mysteryCity.lat, lng: this.mysteryCity.lng},
          options: {animation: google.maps.Animation.BOUNCE, draggable: false},
          label: {
            text: this.mysteryCity.name,
          },
        });
      } else {
        this.saveHistory();
      }
      this.setSuccessRate();
      this.setTotalPlayedGames();

      this.autocompleteControl.disable();
      if (this.isWin) {
        this.shouldStartFireworks = true;
      }
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
    const point1 = new google.maps.LatLng(guessLat, guessLng);
    const point2 = new google.maps.LatLng(mysteryLat, mysteryLng);
    const heading = google.maps.geometry.spherical.computeHeading(point1, point2);

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

  private autoSelectionOnEnterKey(eventKey: string): void {
    if (eventKey === 'Enter' && this.autocomplete?.panelOpen) {
      const filteredList = this.cities?.filter(option => option.name.includes(this.autocompleteControl.value || ''));
      if (filteredList.length) {
        this.autocompleteControl.setValue(filteredList[0].name);
      }
    }
  }

  private getCurrentDateInUTC(): string {
    const currentDate = new Date();
    const offsetInMinutes = currentDate.getTimezoneOffset();
    const utcDate = new Date(currentDate.getTime() - offsetInMinutes * 60 * 1000);

    return utcDate.toISOString().split('T')[0];
  }

  private manageLocalStorage() {
    const step: string | null = localStorage.getItem('step');
    this.step = step ? +step : GUESSES_LEVEL;
    const date = localStorage.getItem('date');
    if (date && date !== this.getCurrentDateInUTC()) {
      this.clearDailyData();
      location.reload();
    }
    const currentGuess = localStorage.getItem('currentGuess');
    const markers = JSON.parse(localStorage.getItem('markers') || '[]');
    const guesses = JSON.parse(localStorage.getItem('guesses') || '[]');
    if (currentGuess && markers && guesses) {
      this.guesses = guesses;
      this.markers = markers;
      this.currentGuess = +currentGuess;
      this.isWin = this.checkIsWin(this.guesses[this.currentGuess - 1].name as string);
      if (this.isGameOver) {
        this.autocompleteControl.disable();
      }
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

  enterKeyHandleSelection(value: string | null) {
    if (! value) {
      return;
    }
    const cityNames = this.cities.map(city => city.name);
    if (cityNames.includes(value)) {
      this.handleSelection(value);
    }

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
    ];

      itemKeys.forEach(item => {localStorage.removeItem(item);});
  }

  navigateBetweenSteps(isUp: boolean) {
    this.isShow = false;
    isUp ? this.step++ : this.step--;
    localStorage.setItem('step', this.step.toString());


    if (this.step === this.POPULATION_LEVEL) {
      const data = createRanges(0, 1000000, 5000);
      this.rangeAnswers = createAnswers(this.mysteryCity.population, data);
    }

    if (this.step === this.AREA_LEVEL) {
      const data = createRanges(0, 250000, 3000);
      this.rangeAnswers = createAnswers(this.mysteryCity.area, data);
    }

    if (this.step === this.FOUNDED_YEAR_LEVEL) {
      const data = createRanges(1590, 2024, 10);
      if (this.mysteryCity.foundedAt) {
        this.rangeAnswers = createAnswers(this.mysteryCity.foundedAt, data);
      } else {
        this.rangeAnswers = [
          {min: 1910, max: 1920, isCorrect: false},
          {min: 0, max: 0, isCorrect: true},
          {min: 1920, max: 1930, isCorrect: false},
          {min: 1930, max: 1940, isCorrect: false},
        ]
      }

    }

    if (this.step === TRIVIA_LEVEL) {
      let citiesWithoutMysteryCity = [...this.citiesOver10k];
      citiesWithoutMysteryCity = citiesWithoutMysteryCity.filter(city => city.name !== this.mysteryCity.name);
      this.textAnswers = getRandomElements(citiesWithoutMysteryCity, 'trivia');
      this.textAnswers.push({text: this.mysteryCity.trivia, isCorrect: true});
      shuffleArray(this.textAnswers);
    }

    if (this.step === SISTER_LEVEL) {
      let citiesWithoutMysteryCity = [...this.citiesOver10k];
      citiesWithoutMysteryCity = citiesWithoutMysteryCity.filter(city => city.name !== this.mysteryCity.name);
      const citiesWithSisterCity = citiesWithoutMysteryCity.filter(city => city.sisterCities);
      this.textAnswers = getRandomElements(citiesWithSisterCity, 'sisterCities');
      this.textAnswers.push({text: this.mysteryCity.sisterCities ?? 'ללא עיר תאומה' , isCorrect: true});
      shuffleArray(this.textAnswers);
    }
    setTimeout(() => {    this.isShow = true;}, 20)
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
}

