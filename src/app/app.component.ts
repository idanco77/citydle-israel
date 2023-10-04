import {Component, OnInit} from '@angular/core';
import {City} from 'src/app/shared/models/city.model';
import {CITIES} from 'src/app/shared/consts/cities.const';
import {map, Observable, startWith} from 'rxjs';
import {FormControl} from '@angular/forms';
import {Guess} from 'src/app/shared/models/guess.model';
import {haversineFormula} from 'src/app/shared/consts/haversineFormula.const';
import {ARROWS} from 'src/app/shared/consts/arrows.const';
import {toCamelCase} from 'src/app/shared/consts/to-camel-case.const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  cities: City[];
  arrows: any = ARROWS;
  filteredCities: Observable<City[]>;
  autocompleteControl: FormControl<string | null> = new FormControl('');
  guesses: Guess[];
  currentGuess = 0;
  mysteryCity: City;

  ngOnInit() {
    this.cities = CITIES.filter(city => city.population > 0);
    this.setGuesses();
    this.setMysteryCity();
    this.initAutocomplete();
    console.log(this.mysteryCity.name);
  }

  private initAutocomplete(): void {
    this.filteredCities = this.autocompleteControl.valueChanges.pipe(
      startWith(''),
      map(value => this.cities.filter(
        option => option.name.includes(value || '')
      )),
    );
  }

  displayFn(city: City): string {
    return city && city .name ? city.name : '';
  }

  calculatePercentages(distance: number): number {
    const israelNorthSouthDistanceKm = 435;

    return 100 - (distance / israelNorthSouthDistanceKm * 100);
  }


  handleSelection(city: any) {
    this.guesses[this.currentGuess].name = city.name;
    const distance = haversineFormula(
      +this.mysteryCity.lat, +this.mysteryCity.lng, city.lat, city.lng
    );
    console.log(distance);
    this.guesses[this.currentGuess].distance = distance;
    this.guesses[this.currentGuess].percentage = this.calculatePercentages(distance);
    this.guesses[this.currentGuess].direction = this.getDirection(
      +this.mysteryCity.lat, +this.mysteryCity.lng, +city.lat, +city.lng
    );
    this.currentGuess++;
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
    this.mysteryCity = this.cities[
      Math.floor(Math.random() * this.cities.length)
      ];
  }

  private getDirection(mysteryLat: number, mysteryLng: number, guessLat: number, guessLng: number) {
    let direction = '';

    if (guessLat.toFixed(1) !==
      mysteryLat.toFixed(1)) {
      direction += guessLat.toFixed(1) >
      mysteryLat.toFixed(1) ?
        'south ' : 'north ';
    }

    if (guessLng.toFixed(1) !==
      mysteryLng.toFixed(1)) {
      direction += (guessLng.toFixed(1) >
      mysteryLng.toFixed(1) ?
        'west' : 'east')
    }

    console.log(this.arrows[toCamelCase(direction)]);
    return this.arrows[toCamelCase(direction)];
  }
}

