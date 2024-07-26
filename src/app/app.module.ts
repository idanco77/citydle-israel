import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MenuComponent} from 'src/app/shared/components/menu/menu.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {StateService} from 'src/app/shared/services/state.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {GoogleMapService} from 'src/app/shared/services/google-map.service';
import {HelpersService} from 'src/app/shared/services/helpers.service';

const routes: Routes = [
  {path: 'guess-the-city', loadChildren: () => import('src/app/guess-the-city/guess-the-city.module').then(m => m.GuessTheCityModule)},
  {path: 'map-challenge', loadChildren: () => import('./map-challenge/map-challenge.module').then(m => m.MapChallengeModule)},
  {path: '', redirectTo: 'guess-the-city', pathMatch: 'full'},
  {path: '**', redirectTo: 'guess-the-city', pathMatch: 'full'},
];

@NgModule({ declarations: [
        AppComponent,
        MenuComponent,
    ],
    bootstrap: [AppComponent], imports: [CommonModule,
        BrowserAnimationsModule,
        BrowserModule,
        RouterModule.forRoot(routes),
        FontAwesomeModule,
        MatTooltipModule,
        NgOptimizedImage,
        MatDialogModule,
        MatSnackBarModule], providers: [
        StateService,
        GoogleMapService,
        HelpersService,
        provideHttpClient(withInterceptorsFromDi(), withJsonpSupport())
    ] })
export class AppModule { }
