import {Component, HostBinding, Inject, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {GoogleMapService} from 'src/app/shared/services/google-map.service';
import {DOCUMENT} from '@angular/common';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';
import {DARK, LIGHT} from 'src/app/shared/consts/map-settings.const';
import {OverlayContainer} from '@angular/cdk/overlay';
import {StateService} from 'src/app/shared/services/state.service';
import {HelpersService} from 'src/app/shared/services/helpers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  protected readonly faMugHot = faMugHot;
  private subs = new Subscription();
  @HostBinding('class') className = '';

  constructor(private router: Router,
              private overlay: OverlayContainer,
              private stateService: StateService,
              private helpers: HelpersService,
              @Inject(DOCUMENT) private document: Document) {
    this.handleRouteEvents();
  }

  ngOnInit() {
    const isDarkMode = localStorage.getItem('isDarkMode') === '1';
    this.toggleDarkMode(isDarkMode);

    this.subs.add(this.stateService.toggleDarkMode.subscribe(isDarkMode => {
      this.toggleDarkMode(isDarkMode);
    }));

    const date = localStorage.getItem('date');
    if (date && date !== this.helpers.getCurrentDateInUTC()) {
      this.clearDailyData();
    }
  }

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

  toggleDarkMode(isDarkMode: boolean): void {
    const darkMode = 'darkMode';
      this.className = isDarkMode ? darkMode : '';
      if (isDarkMode) {
        this.overlay.getContainerElement().classList.add(darkMode);
        document.body.classList.add('dark-mode-design');
      } else {
        this.overlay.getContainerElement().classList.remove(darkMode);
        document.body.classList.remove('dark-mode-design');
      }
  }

  private clearDailyData(): void {
    const itemKeys = ['date', 'currentGuess', 'markers', 'guesses',
      'population', 'area', 'foundedAt', 'step', 'sisterCities', 'trivia',
      'nearestCities', 'nearestCitiesGuesses', 'nearestCitiesGuessesIndex',
      'nearestCitiesMarkers', 'grade', 'levels', 'isMysteryCityGradeAdded',
      'mapChallengeIndex', 'mapChallengeGrade', 'mapChallengeAllMarkers',
      'mapChallengeSummary'
    ];

    itemKeys.forEach(item => {localStorage.removeItem(item);});
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}

