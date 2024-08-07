import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {catchError, filter, interval, map, Observable, of, takeWhile} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {GoogleMap} from '@angular/google-maps';

@Injectable()
export class GoogleMapService {
  constructor(private  httpClient: HttpClient) {
  }

  apiLoaded(): Observable<boolean> {
    return this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=' + environment.apiKey, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }
}
