import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CityListProvider } from '../../providers/city-list/city-list';
import { CityDetailsPage } from '../city-details/city-details';

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
    public cityList: CityListProvider,
    public appCtrl: App
    ) {
    this.matches = [];
  }

  updateList(str: string) {
    if (str.length > 1) {
      this.matches = this.cityList.search(str);
    }
  }

  addFavorite(cityId: number) {
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(CityDetailsPage, {cityId});
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
