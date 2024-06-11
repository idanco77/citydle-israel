import {NgModule} from '@angular/core';
import {MapChallengeComponent} from 'src/app/map-challenge/map-challenge.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: MapChallengeComponent},
]
@NgModule({
  declarations: [
    MapChallengeComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class MapChallengeModule {

}
