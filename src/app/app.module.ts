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
import {ResultDialogComponent} from 'src/app/result-dialog/result-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {IntroDialogComponent} from 'src/app/intro-dialog/intro-dialog.component';
import { RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {GuessComponent} from 'src/app/shared/components/guess/guess.component';
import {XComponent} from 'src/app/shared/components/x/x.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FireworksComponent} from 'src/app/shared/components/fireworks/fireworks.component';
import {
  BonusLevelNumberRangesComponent
} from 'src/app/shared/components/bonus-level-number-ranges/bonus-level-number-ranges.component';
import {MenuComponent} from 'src/app/shared/components/menu/menu.component';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    ResultDialogComponent,
    IntroDialogComponent,
    GuessComponent,
    XComponent,
    FireworksComponent,
    BonusLevelNumberRangesComponent,
    MenuComponent
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
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
