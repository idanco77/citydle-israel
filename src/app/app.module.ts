import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {GoogleMapsModule} from '@angular/google-maps';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {StatsDialogComponent} from 'src/app/stats-dialog/stats-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {IntroDialogComponent} from 'src/app/intro-dialog/intro-dialog.component';
import { RouterOutlet} from '@angular/router';
import {DecimalPipe, NgOptimizedImage} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {GuessComponent} from 'src/app/shared/components/guess/guess.component';
import {XComponent} from 'src/app/shared/components/x/x.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {
  BonusLevelNumberRangesComponent
} from 'src/app/shared/components/bonus-level-number-ranges/bonus-level-number-ranges.component';
import {MenuComponent} from 'src/app/shared/components/menu/menu.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {
  BonusLevelTextAnswersComponent
} from 'src/app/shared/components/bonus-level-text-ranges/bonus-level-text-answers.component';
import {StateService} from 'src/app/shared/services/state.service';
import {NearestCityComponent} from 'src/app/shared/components/nearest-cities/nearest-city.component';
import {AutocompleteCityComponent} from 'src/app/shared/components/autocomplete-city/autocomplete-city.component';
import {TitlesComponent} from 'src/app/shared/components/titles/titles.component';
import {GoogleMapService} from 'src/app/shared/services/google-map.service';
import {ErrorMessageService} from 'src/app/shared/services/error-message.service';
import {ResultsDialogComponent} from 'src/app/results-dialog/results-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    StatsDialogComponent,
    ResultsDialogComponent,
    IntroDialogComponent,
    GuessComponent,
    XComponent,
    BonusLevelNumberRangesComponent,
    MenuComponent,
    BonusLevelTextAnswersComponent,
    NearestCityComponent,
    AutocompleteCityComponent,
    TitlesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatDialogModule,
    RouterOutlet,
    NgOptimizedImage,
    MatIconModule,
    ClipboardModule,
    FontAwesomeModule,
    MatTooltipModule,
    MatGridListModule,
    MatExpansionModule,
  ],
  providers: [
    StateService,
    DecimalPipe,
    GoogleMapService,
    ErrorMessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
