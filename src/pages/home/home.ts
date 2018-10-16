import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  position: {lat: number, lng: number};

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords);
      this.position = {lat: resp.coords.latitude, lng: resp.coords.longitude};
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
