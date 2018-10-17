import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiMeteoProvider } from '../../providers/api-meteo/api-meteo';
import { City } from '../../app/City';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  locationMeteo: City;
  favoritesMeteo: City[];

  constructor(
    public navCtrl: NavController, public apiMeteo: ApiMeteoProvider,
    public modalCtrl: ModalController, public storage: Storage
    ) {
      this.favoritesMeteo = [];
  }

  ionViewDidLoad() {
    this.getLocalMeteo();
  }

  ionViewDidEnter() {
    this.getFavoritesMeteo();
  }

  getLocalMeteo() {
    this.apiMeteo.getCityFromPosition().subscribe((data: City) => {
      this.locationMeteo = data;
    });
  }

  getFavoritesMeteo() {
    this.apiMeteo.getFavoritesMeteo().subscribe((data: City[]) => {
        this.favoritesMeteo = data;
    });
  }

  addFavorite() {
    let favoriteModal = this.modalCtrl.create('FavoritePage');

    favoriteModal.onDidDismiss(data => {
      if (data) {
        this.getFavoritesMeteo();
      }
    });

    favoriteModal.present();
  }

  removeFavorite(cityId: number) {
    let favorites = this.storage.get('favorites').then((data: number[]) => {
      if (!data) {
        return;
      }

      data.splice(data.indexOf(cityId), 1);
      this.storage.set('favorites', data);

      this.getFavoritesMeteo();
    });
  }
}
