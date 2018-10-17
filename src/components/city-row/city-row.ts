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

  constructor(public navCtrl: NavController) {
  }

  /**
   * Navigate to detail view
   */
  navToDetails() {
    this.navCtrl.push(CityDetailsPage, {city: this.city});
  }
}
