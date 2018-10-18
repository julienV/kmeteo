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
  cityId: number;
  name: string;
  forecast: any;
  tomorrow: Date;
  isFavorite = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public api: ApiMeteoProvider, public storage: Storage) {
    // Coming from search city, we don't have the City weather object yet, just id and name
    this.cityId = navParams.get('cityId');
    this.name = navParams.get('name');

    // Coming from home, we already have the weather
    this.city = navParams.get('city');

    var q = new Date();
    var m = q.getMonth();
    var d = q.getDate() + 1;
    var y = q.getFullYear();

    this.tomorrow = new Date(y,m,d);
  }

  ionViewDidLoad() {
    if (!this.city) {
      // Get from id, coming from add favorite
      this.api.getCityWeather(this.cityId).subscribe(data => {
        this.city = data;
        this.name = data.name;
      })
    }
    else {
      // Get those info from city
      this.cityId = this.city.id;
      this.name = this.city.name;
    }
    
    // Get forecast
    this.api.getCityForecast(this.cityId).subscribe(data => {
      this.forecast = data;
    })

    // Check if is in favorites
    this.storage.get('favorites').then((data) => {
      this.isFavorite = data.indexOf(this.cityId) > -1;
    });
  }

  /**
   * forecast query returns weather for each 3h, so just take the weather at 12:00 for the day
   */
  filteredResults() {
    return this.forecast.list.filter((data) => {
      const date = new Date(data.dt_txt);
      
      return data.dt_txt.indexOf('12:00:00') > -1 && date >= this.tomorrow;
    });
  }

  /**
   * Delete from favorites
   */
  delete() {
    this.storage.get('favorites').then((data) => {
      data.splice(data.indexOf(this.cityId), 1);
      this.storage.set('favorites', data).then(data => {
        this.isFavorite = false;
      });
    });
  }

  /**
   * add to favorites
   */
  add() {
    this.storage.get('favorites').then((data: number[]) => {
      if (!data) {
        data = [];
      }

      if (data.indexOf(this.cityId) == -1) {
        data.push(this.cityId);
        this.storage.set('favorites', data).then(data => {
          this.isFavorite = true;
        });
      }
    });
  }
}
