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

  /**
   * Get weather from current position
   */
  getLocalMeteo() {
    this.apiMeteo.getCityFromPosition().subscribe((data: City) => {
      this.locationMeteo = data;
    });
  }

  /**
   * Get weather for favorites
   */
  getFavoritesMeteo() {
    this.apiMeteo.getFavoritesMeteo().subscribe((data: City[]) => {
        this.favoritesMeteo = data;
    });
  }

  /**
   * Open add favorite page
   */
  addFavorite() {
    let favoriteModal = this.modalCtrl.create('FavoritePage');

    favoriteModal.onDidDismiss(data => {
      if (data) {
        this.getFavoritesMeteo();
      }
    });

    favoriteModal.present();
  }
}
