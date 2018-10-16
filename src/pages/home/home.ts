import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ApiMeteoProvider } from '../../providers/api-meteo/api-meteo';
import { City } from '../../app/City';
import { ModalController } from 'ionic-angular';
import { FavoritePage } from '../favorite/favorite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  locationMeteo: City;

  constructor(
    public navCtrl: NavController, public geolocation: Geolocation, public apiMeteo: ApiMeteoProvider,
    public modalCtrl: ModalController
    ) {
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

  addFavorite() {
    let favoriteModal = this.modalCtrl.create('FavoritePage');
    favoriteModal.present();
  }
}
