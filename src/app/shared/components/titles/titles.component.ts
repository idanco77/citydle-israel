import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faCalendarDays, faCircleChevronLeft, faCircleChevronRight, faCity,
  faClipboardQuestion, faGlobe, faMapLocation, faUsers } from '@fortawesome/free-solid-svg-icons';
import {LEVELS, Levels} from 'src/app/shared/consts/steps.const';


@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html'
})
export class TitlesComponent {
  @Input() step: number;
  @Input() isGameOver: boolean;
  @Output() navigate = new EventEmitter<boolean>();

  protected readonly GUESSES_LEVEL = Levels.GUESSES;
  protected readonly POPULATION_LEVEL = Levels.POPULATION;
  protected readonly AREA_LEVEL = Levels.AREA;
  protected readonly FOUNDED_YEAR_LEVEL = Levels.FOUNDED_YEAR;
  protected readonly SISTER_LEVEL = Levels.SISTER;
  protected readonly NEAREST_CITY_LEVEL = Levels.NEAREST_CITY;
  protected readonly faCircleChevronLeft = faCircleChevronLeft;
  protected readonly faCircleChevronRight = faCircleChevronRight;
  protected readonly faUsers = faUsers;
  protected readonly faMapLocation = faMapLocation;
  protected readonly faCalendarDays = faCalendarDays;
  protected readonly faClipboardQuestion = faClipboardQuestion;
  protected readonly faGlobe = faGlobe;
  protected readonly faCity = faCity;
  protected readonly LAST_LEVEL = LEVELS.length - 1;

  navigateBetweenSteps(isUp: boolean) {
    this.navigate.emit(isUp);
  }
}
