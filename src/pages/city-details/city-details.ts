import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { City } from '../../app/City';
import { ApiMeteoProvider } from '../../providers/api-meteo/api-meteo';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-city-details',
  templateUrl: 'city-details.html',
})
export class CityDetailsPage {
  city: City;
  forecast: any;
  tomorrow: Date;
  isFavorite = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public api: ApiMeteoProvider, public storage: Storage) {
    this.city = navParams.get('city');
    this.isFavorite = navParams.get('isFavorite');

    var q = new Date();
    var m = q.getMonth();
    var d = q.getDate() + 1;
    var y = q.getFullYear();

    this.tomorrow = new Date(y,m,d);
  }

  ionViewDidLoad() {
    this.api.getCityForecast(this.city.id).subscribe(data => {
      this.forecast = data;
    })
  }

  filteredResults() {
    return this.forecast.list.filter((data) => {
      const date = new Date(data.dt_txt);
      
      return data.dt_txt.indexOf('12:00:00') > -1 && date >= this.tomorrow;
    });
  }

  delete() {
    this.storage.get('favorites').then((data) => {
      data.splice(data.indexOf(this.city.id), 1);
      this.storage.set('favorites', data);
    });  
    this.navCtrl.pop(); 
  }
}
