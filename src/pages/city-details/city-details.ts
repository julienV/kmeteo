import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { City } from '../../app/City';
import { ApiMeteoProvider } from '../../providers/api-meteo/api-meteo';

@Component({
  selector: 'page-city-details',
  templateUrl: 'city-details.html',
})
export class CityDetailsPage {
  city: City;
  forecast: any;
  tomorrow: Date;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiMeteoProvider) {
    this.city = navParams.get('city');

    this.tomorrow = new Date();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
  }

  ionViewDidLoad() {
    this.api.getCityForecast(this.city.id).subscribe(data => {
      this.forecast = data;
    })
  }

  filteredResults() {
    return this.forecast.list.filter((data) => {
      const date = new Date(data.dt_txt);
      
      return data.dt_txt.indexOf('09:00:00') > -1 && date > this.tomorrow;
    });
  }
}
