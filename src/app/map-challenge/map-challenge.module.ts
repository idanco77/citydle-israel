import {NgModule} from '@angular/core';
import {MapChallengeComponent} from 'src/app/map-challenge/map-challenge.component';
import {RouterModule, Routes} from '@angular/router';
import {GoogleMapsModule} from '@angular/google-maps';
import {AsyncPipe, CommonModule} from '@angular/common';
import {GoogleMapService} from 'src/app/shared/services/google-map.service';
import {HelpersService} from 'src/app/shared/services/helpers.service';
import {NextChallengeTimerModule} from 'src/app/shared/components/next-challenge-timer/next-challenge-timer.module';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatExpansionModule} from '@angular/material/expansion';

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
        NextChallengeTimerModule,
        MatTableModule,
        MatSortModule,
        MatExpansionModule
    ]
})
export class MapChallengeModule {

}
