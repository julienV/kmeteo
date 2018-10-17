import { Component, Input } from '@angular/core';
import { City } from '../../app/City';

/**
 * Generated class for the CityRowComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'city-row',
  templateUrl: 'city-row.html'
})
export class CityRowComponent {

  @Input()
  city: City;

  constructor() {
  }

  temp(value: number) {
    return Math.round(value - 273.15);
  }
}
