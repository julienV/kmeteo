import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CityListProvider } from '../../providers/city-list/city-list';

/**
 * Generated class for the FavoritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {
  matches: any[];

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public cityList: CityListProvider, public storage: Storage
    ) {
    this.matches = [];
  }

  updateList(str: string) {
    if (str.length > 1) {
      this.matches = this.cityList.search(str);
    }
  }

  addFavorite(cityId: number) {
    let favorites = this.storage.get('favorites').then((data: number[]) => {
      if (!data) {
        data = [];
      }

      if (data.indexOf(cityId) == -1) {
        data.push(cityId);
        this.storage.set('favorites', data);
      }
    });

    this.viewCtrl.dismiss(cityId);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
