import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StateService} from 'src/app/shared/services/state.service';
import {GoogleMapService} from 'src/app/shared/services/google-map.service';
import {GoogleMap} from '@angular/google-maps';
import {DARK, LIGHT, MAP_SETTINGS} from 'src/app/shared/consts/map-settings.const';
import {createMarker} from 'src/app/shared/consts/createMarker.const';
import {Marker} from 'src/app/shared/models/marker.model';
import {CITIES} from 'src/app/shared/consts/cities.const';
import {City} from 'src/app/shared/models/city.model';
import {haversineFormula} from 'src/app/shared/consts/haversineFormula.const';
import {START_DATE} from 'src/app/shared/consts/start-date.const';
import {HelpersService} from 'src/app/shared/services/helpers.service';
import {filter, interval, Observable, Subscription, takeWhile} from 'rxjs';

@Component({
  selector: 'app-map-challenge',
  templateUrl: './map-challenge.component.html',
  styleUrls: ['./map-challenge.component.scss']
})
export class MapChallengeComponent implements OnInit, OnDestroy {
  mapWidth = this.stateService.getMapWidth();
  apiLoaded: any;
  @ViewChild('googleMap') googleMap: GoogleMap;
  markers: any = [];
  allMarkers: any = [];
  mapSettings: google.maps.MapOptions = MAP_SETTINGS;
  cities: City[];
  cityIndex = 0;
  isGameOver: boolean = false;
  grade: number = 0;
  subs = new Subscription();
  private isDarkMode: boolean;
  hours: string | number;
  minutes: string | number;
  seconds: string | number;

  constructor(private stateService: StateService,
              private googleMapService: GoogleMapService,
              private helpers: HelpersService) {
    this.apiLoaded = this.googleMapService.apiLoaded();
  }

  ngOnInit() {
    this.subs.add(this.stateService.toggleDarkMode.subscribe(isDarkMode => {
      this.toggleDarkMode(isDarkMode);
    }));

    this.initializeMap$().subscribe(() => {
      const isDarkMode = localStorage.getItem('isDarkMode') === '1';
      this.toggleDarkMode(isDarkMode);
    });

    const cities: City[][]  = this.splitArray([... CITIES], 10);
    const index = this.helpers.getDifferenceInDays((new Date('2024-06-14')), new Date(new Date()));
    this.cities = cities[index];
    this.grade = parseInt(localStorage.getItem('mapChallengeGrade') ?? '0');
    this.cityIndex = parseInt(localStorage.getItem('mapChallengeIndex') ?? '0');
    this.allMarkers = JSON.parse(localStorage.getItem('mapChallengeAllMarkers') || '[]');
    if (this.cityIndex === this.cities.length - 1) {
      this.isGameOver = true;
      this.markers = this.allMarkers;
    }
  }

  initializeMap$(): Observable<number> {
    return interval(100).pipe(
      filter(() => !!this.googleMap), // Emit only when googleMap is truthy
      takeWhile(() => !this.googleMap, true) // Continue emitting until googleMap is truthy
    );
  }


  locationSelected(event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) {
    if (this.isGameOver) {
      return;
    }
    this.markers = [];
    const city: City = this.cities[this.cityIndex];
    const distance = haversineFormula(
      event.latLng?.toJSON().lat as number,
      event.latLng?.toJSON().lng as number,
      city.lat,
      city.lng
    );

    const grade = this.getGrade(distance);
    this.grade += grade;

    const selectedCityMarker = createMarker({
      lat: event.latLng?.toJSON().lat as number,
      lng: event.latLng?.toJSON().lng as number,
      name: city.name + '. ' + grade + '/10'
    });
    this.markers.push(selectedCityMarker);
    this.allMarkers.push(selectedCityMarker);

    const cityMarker = createMarker(
      {lat: city.lat, lng: city.lng, name: city.name}, true
    );
    this.markers.push(cityMarker);
    this.allMarkers.push(cityMarker);
    this.cityIndex++;

    localStorage.setItem('mapChallengeIndex', this.cityIndex.toString());
    localStorage.setItem('mapChallengeGrade', this.grade.toString());
    localStorage.setItem('mapChallengeAllMarkers', JSON.stringify(this.allMarkers));

    if (this.cityIndex >= this.cities.length - 1) {
      this.isGameOver = true;
      this.displayAllMarkers();
    }
  }

  private getGrade(distance: number) {
    const grades = [
      {upTo: 1, grade: 10},
      {upTo: 3, grade: 9},
      {upTo: 5, grade: 8},
      {upTo: 10, grade: 7},
      {upTo: 15, grade: 6},
      {upTo: 20, grade: 5},
      {upTo: 30, grade: 4},
      {upTo: 40, grade: 3},
      {upTo: 45, grade: 2},
      {upTo: 50, grade: 1}
    ];

    let grade = 0;
    for (let i = 0; i < grades.length; i++) {
      if (distance <= grades[i].upTo) {
        grade = grades[i].grade;
        break;
      }
    }
    return grade;
  }

  splitArray<T>(inputArray: T[], chunkSize: number): T[][] {
    let result: T[][] = [];
    for (let i = 0; i < inputArray.length; i += chunkSize) {
      result.push(inputArray.slice(i, i + chunkSize));
    }
    return result;
  }

  private toggleDarkMode(isDarkMode: boolean) {
    this.isDarkMode = isDarkMode;
    this.setMapOptions();
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

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private displayAllMarkers() {
    this.markers = this.allMarkers;
  }

  private resetMarkers(isDarkMode: boolean): void {
    const markers = JSON.parse(localStorage.getItem('mapChallengeAllMarkers') || '[]');
    if (markers) {
      markers.forEach((marker: any) => {
        marker.label.color = isDarkMode ? 'white' : 'black';
        this.markers.push(marker);
      })
    }
  }
}
