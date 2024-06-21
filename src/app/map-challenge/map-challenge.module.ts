import {NgModule} from '@angular/core';
import {MapChallengeComponent} from 'src/app/map-challenge/map-challenge.component';
import {RouterModule, Routes} from '@angular/router';
import {GoogleMapsModule} from '@angular/google-maps';
import {AsyncPipe, CommonModule} from '@angular/common';
import {NextChallengeTimerModule} from 'src/app/shared/components/next-challenge-timer/next-challenge-timer.module';

const routes: Routes = [
  {path: '', component: MapChallengeComponent},
]
@NgModule({
  declarations: [
    MapChallengeComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        GoogleMapsModule,
        AsyncPipe,
        NextChallengeTimerModule
    ]
})
export class MapChallengeModule {

}
