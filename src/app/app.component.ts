import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {GoogleMapService} from 'src/app/shared/services/google-map.service';
import {DOCUMENT} from '@angular/common';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  protected readonly faMugHot = faMugHot;

constructor(private router: Router,
            @Inject(DOCUMENT) private document: Document) {
  this.handleRouteEvents();
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
}

