import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
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

  /**
   * Get matching cities from local json file
   * 
   * @param str 
   */
  updateList(str: string) {
    if (str.length > 1) {
      this.matches = this.cityList.search(str);
    }
  }

  /**
   * Go to details page
   * 
   * @param cityId 
   * @param name
   */
  addFavorite(cityId: number, name: string) {
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(CityDetailsPage, {cityId: cityId, name: name});
  }

  /**
   * Close modal without action
   */
  closeModal() {
    this.viewCtrl.dismiss();
  }
}
