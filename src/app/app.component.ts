import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {City} from 'src/app/shared/models/city.model';
import {CITIES} from 'src/app/shared/consts/cities.const';
import {catchError, map, Observable, of, startWith} from 'rxjs';
import {FormControl} from '@angular/forms';
import {Guess} from 'src/app/shared/models/guess.model';
import {haversineFormula} from 'src/app/shared/consts/haversineFormula.const';
import {ARROWS} from 'src/app/shared/consts/arrows.const';
import {toCamelCase} from 'src/app/shared/consts/to-camel-case.const';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GoogleMap} from '@angular/google-maps';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    this.autoSelectionOnEnterKey(event.key);
  }
  @ViewChild('googleMap') googleMap: GoogleMap;
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger | undefined;
  cities: City[];
  arrows: any = ARROWS;
  filteredCities: Observable<City[]>;
  autocompleteControl: FormControl<string | null> = new FormControl('');
  guesses: Guess[];
  currentGuess = 0;
  mysteryCity: City;
  options: google.maps.MapOptions;
  markers: any = [];
  private isWin: boolean = false;
  apiLoaded: Observable<boolean>;

  constructor(private snackBar: MatSnackBar, httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=' + environment.apiKey, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  ngOnInit() {
    const stylesArray = [
      {
        'elementType': 'labels',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'administrative.neighborhood',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      }
    ];
    this.options = {
      center: {lat: 31.496931, lng: 34.994928},
      zoom: 7.5,
      streetViewControl: false,
      disableDefaultUI: true,
      scrollwheel: true,
      fullscreenControl: false,
      mapTypeControl: false,
      zoomControl: false,
      styles: stylesArray
    }

    this.cities = CITIES;
    this.setGuesses();
    this.setMysteryCity();
    this.initAutocomplete();
    this.manageLocalStorage();
  }

  private initAutocomplete(): void {
    this.filteredCities = this.autocompleteControl.valueChanges.pipe(
      startWith(''),
      map(value => this.cities.filter(
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
    if (! selectedCity) {
      return;
    }
    if (this.isWin || this.currentGuess > 5) {
      return;
    }
    if (this.isWin || this.currentGuess === 5) {
        this.showMysteryCityMarker();
        if (this.isWin) {
          // do something
        }
        this.isWin = false;
    }
    const city = this.cities.find(city => city.name === selectedCity) as City;
    if (!city) {
      this.snackBar.open('יישוב לא ידוע', 'X', {
        duration: 1500,
        verticalPosition: 'top'
      });
      return;
    }
    this.isWin = city.name === this.mysteryCity.name;

    this.markers.push({
      position: {lat: +city.lat, lng: +city.lng},
      options: {animation: this.isWin ? google.maps.Animation.BOUNCE : null, draggable: false},
      label: {
        text: city.name,
      },
    });
    this.guesses[this.currentGuess].name = city.name;
    const distance = haversineFormula(
      +this.mysteryCity.lat, +this.mysteryCity.lng, +city.lat, +city.lng
    );
    this.guesses[this.currentGuess].distance = distance;
    this.guesses[this.currentGuess].percentage = this.calculatePercentages(distance);
    this.guesses[this.currentGuess].direction = this.getDirection(
      +this.mysteryCity.lat, +this.mysteryCity.lng, +city.lat, +city.lng, distance
    );
    this.currentGuess++;
    this.autocompleteControl.reset();

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

  private setMysteryCity() {
    let citiesOver10k = this.cities.filter(city => city.population >= 10000);
    citiesOver10k = [...citiesOver10k, ...citiesOver10k, ...citiesOver10k, ...citiesOver10k, ...citiesOver10k, ...citiesOver10k, ...citiesOver10k, ...citiesOver10k, ...citiesOver10k, ...citiesOver10k, ...citiesOver10k, ...citiesOver10k];
    this.mysteryCity = citiesOver10k[this.getDifferenceInDays((new Date('2023-10-25')), new Date(new Date()))];
  }

  getDifferenceInDays(firstDate: Date, today: Date) {
    const num  = new Date(today).setHours(0, 0, 0, 0) - firstDate.setHours(0, 0, 0, 0);
    return Math.round(num / 864e5);
  }

  private getDirection(mysteryLat: number, mysteryLng: number, guessLat: number, guessLng: number, distance: number) {
    const fractionDigit = this.getFractionDigits(distance);

    let direction = '';
    if (guessLat.toFixed(fractionDigit) !==
      mysteryLat.toFixed(fractionDigit)) {
      direction += guessLat.toFixed(fractionDigit) >
      mysteryLat.toFixed(fractionDigit) ?
        'south ' : 'north ';
    }

    if (guessLng.toFixed(fractionDigit) !==
      mysteryLng.toFixed(fractionDigit)) {
      direction += (guessLng.toFixed(fractionDigit) >
      mysteryLng.toFixed(fractionDigit) ?
        'west' : 'east')
    }

    return this.arrows[toCamelCase(direction)];
  }

  private getFractionDigits(distance: number): number {
    if (distance < 150) return 1;
    return 0;
  }

  private autoSelectionOnEnterKey(eventKey: string): void {
    if (eventKey === 'Enter' && this.autocomplete?.panelOpen) {
      const filteredList = this.cities?.filter(option => option.name.includes(this.autocompleteControl.value || ''));
      if (filteredList.length) {
        this.autocompleteControl.setValue(filteredList[0].name);
        this.handleSelection(this.autocompleteControl.value);
        this.autocomplete?.closePanel();
        this.autocompleteControl.reset();
      }
    }
  }

  private showMysteryCityMarker() {
    this.markers.push({
      position: {lat: +this.mysteryCity.lat, lng: +this.mysteryCity.lng},
      options: {animation: google.maps.Animation.BOUNCE, draggable: false},
      label: {
        color: 'green',
        text: 'העיר המסתורית היא: ' + this.mysteryCity.name,
      },
    });
  }

  private getCurrentDateInUTC(): string {
    const currentDate = new Date();
    const offsetInMinutes = currentDate.getTimezoneOffset();
    const utcDate = new Date(currentDate.getTime() - offsetInMinutes * 60 * 1000);

    return utcDate.toISOString().split('T')[0];
  }

  private manageLocalStorage() {
    const date = localStorage.getItem('date');
    if (date && date !== this.getCurrentDateInUTC()) {
      localStorage.clear();
    }
    const currentGuess = localStorage.getItem('currentGuess');
    const markers = JSON.parse(localStorage.getItem('markers') || '[]');
    const guesses = JSON.parse(localStorage.getItem('guesses') || '[]');
    if (currentGuess && markers && guesses) {
      this.guesses = guesses;
      this.markers = markers;
      this.currentGuess = +currentGuess;
    } else {
      localStorage.clear();
    }
  }
}

