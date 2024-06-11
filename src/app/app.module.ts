import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
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

const routes: Routes = [
  {path: 'guess-the-city', loadChildren: () => import('./citydle/citydle.module').then(m => m.CitydleModule)},
  {path: 'map-challenge', loadChildren: () => import('./map-challenge/map-challenge.module').then(m => m.MapChallengeModule)},
  {path: '', redirectTo: 'original', pathMatch: 'full'},
  {path: '**', redirectTo: 'original', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    HttpClientJsonpModule,
    FontAwesomeModule,
    MatTooltipModule,
    NgOptimizedImage,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    StateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
