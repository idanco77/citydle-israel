import {NgModule} from '@angular/core';
import {CitydleComponent} from 'src/app/citydle/citydle.component';
import {StatsDialogComponent} from 'src/app/stats-dialog/stats-dialog.component';
import {ResultsDialogComponent} from 'src/app/results-dialog/results-dialog.component';
import {IntroDialogComponent} from 'src/app/intro-dialog/intro-dialog.component';
import {GuessComponent} from 'src/app/shared/components/guess/guess.component';
import {XComponent} from 'src/app/shared/components/x/x.component';
import {
  BonusLevelNumberRangesComponent
} from 'src/app/shared/components/bonus-level-number-ranges/bonus-level-number-ranges.component';
import {MenuComponent} from 'src/app/shared/components/menu/menu.component';
import {NearestCityComponent} from 'src/app/shared/components/nearest-cities/nearest-city.component';
import {AutocompleteCityComponent} from 'src/app/shared/components/autocomplete-city/autocomplete-city.component';
import {TitlesComponent} from 'src/app/shared/components/titles/titles.component';
import {MatDialogModule} from '@angular/material/dialog';
import {RouterModule, RouterOutlet, Routes} from '@angular/router';
import {CommonModule, DecimalPipe, NgOptimizedImage, PercentPipe} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {StateService} from 'src/app/shared/services/state.service';
import {GoogleMapService} from 'src/app/shared/services/google-map.service';
import {ErrorMessageService} from 'src/app/shared/services/error-message.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {GoogleMapsModule} from '@angular/google-maps';

const routes: Routes = [
  {path: '', component: CitydleComponent},
];

@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterOutlet,
    MatIconModule,
    ClipboardModule,
    FontAwesomeModule,
    MatGridListModule,
    MatExpansionModule,
    RouterModule.forChild(routes),
    PercentPipe,
    DecimalPipe,
    GoogleMapsModule
  ],
  declarations: [
    CitydleComponent,
    StatsDialogComponent,
    ResultsDialogComponent,
    IntroDialogComponent,
    GuessComponent,
    XComponent,
    BonusLevelNumberRangesComponent,
    NearestCityComponent,
    AutocompleteCityComponent,
    TitlesComponent
  ],
  providers: [
    DecimalPipe,
    GoogleMapService,
    ErrorMessageService
  ],
  exports: [
    CitydleComponent
  ]
})
export class CitydleModule {

}
