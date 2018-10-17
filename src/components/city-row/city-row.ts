import { Component, Input } from '@angular/core';
import { City } from '../../app/City';
import { NavController } from 'ionic-angular';
import { CityDetailsPage } from '../../pages/city-details/city-details';

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

  @Input()
  isFavorite = false;

  constructor(public navCtrl: NavController) {
  }

  temp(value: number): number {
    return Math.round(value - 273.15);
  }

  navToDetails() {
    this.navCtrl.push(CityDetailsPage, {city: this.city, isFavorite: this.isFavorite});
  }
}
