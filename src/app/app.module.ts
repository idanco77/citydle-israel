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
import {environment} from '../environments/environment';
import { RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ResultDialogComponent,
    IntroDialogComponent
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
    ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
