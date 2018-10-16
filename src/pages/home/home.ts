import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ApiMeteoProvider } from '../../providers/api-meteo/api-meteo';
import { City } from '../../app/City';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  locationMeteo: City;

  constructor(public navCtrl: NavController, private geolocation: Geolocation, public apiMeteo: ApiMeteoProvider) {
  }

  ionViewDidLoad() {
    this.getLocalMeteo();
  }

  getLocalMeteo() {
    this.geolocation.getCurrentPosition().then((resp) => {
      const position = {lat: resp.coords.latitude, lng: resp.coords.longitude};
      this.apiMeteo.getCityFromPosition(position).then((data: City) => {
        this.locationMeteo = data;
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
