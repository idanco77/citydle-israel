import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {FormControl} from '@angular/forms';
import {CITIES} from 'src/app/shared/consts/cities.const';
import {City} from 'src/app/shared/models/city.model';
import {map, Observable, startWith} from 'rxjs';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete-city.component.html',
  styleUrls: ['./autocomplete-city.component.scss']
})
export class AutocompleteCityComponent implements OnInit {
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger | undefined;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    this.autoSelectionOnEnterKey(event.key);
  }

  @Output() selectedCity = new EventEmitter<string | null>();
  @Input() isDisabled: boolean;
  @Input() cities: City[];

  filteredCities: Observable<City[]>;
  autocompleteControl: FormControl<string | null> = new FormControl('');
  protected readonly faMagnifyingGlass = faMagnifyingGlass;

  ngOnInit() {
    this.initAutocomplete();
  }

  enterKeyHandleSelection(value: string | null) {
    if (! value) {
      return;
    }
    const cityNames = this.cities.map(city => city.name);
    if (cityNames.includes(value)) {
      this.handleSelection(value);
    }
  }

  handleSelection(value: string | null) {
    this.autocompleteControl.reset();
    this.autocomplete?.closePanel();
    this.selectedCity.emit(value);
  }

  private initAutocomplete(): void {
    this.filteredCities = this.autocompleteControl.valueChanges.pipe(
      startWith(''),
      map(value => this.cities.sort((a, b) => 0.5 - Math.random()).filter(
        option => option.name.includes(value || '')
      )),
    );
  }

  private autoSelectionOnEnterKey(eventKey: string): void {
    if (eventKey === 'Enter' && this.autocomplete?.panelOpen) {
      const filteredList = this.cities?.filter(option => option.name.includes(this.autocompleteControl.value || ''));
      if (filteredList.length) {
        this.autocompleteControl.setValue(filteredList[0].name);
      }
    }
  }

}
