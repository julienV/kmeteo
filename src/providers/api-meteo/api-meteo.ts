import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../../app/City';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

/*
  Generated class for the ApiMeteoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiMeteoProvider {
  localApiUrl = 'http://localhost:3000';
  apiUrl = 'http://api.openweathermap.org/data/2.5/'
  key = "&APPID=3309d28ad2c28b1a00c576b89708436f"

  constructor(public http: HttpClient, public storage: Storage, public geolocation: Geolocation) {
  };  

  getCityFromPosition(): Observable<City> {
    return Observable.fromPromise(this.geolocation.getCurrentPosition())
      .mergeMap((resp) => {
        return this.http.get<City>(
          this.apiUrl + 'weather?lat=' + resp.coords.latitude + '&lon=' + resp.coords.longitude + this.key)
          .map((data) => new City(data));
      });
  }

  getFavoritesMeteo(): Observable<City[]> {
    return Observable.fromPromise(this.storage.get('favorites'))
      .mergeMap((resp) => {
        if (!resp) {
          throw 0;  
        }
        const observables = [];
        for (let i = 0; i < resp.length; i++) {
          observables.push(this.http.get<City>(this.apiUrl + 'weather?id=' + resp[i] + this.key)
            .map((data) => new City(data)));
        }

        return Observable.forkJoin(observables);
      });
  }

  getCityForecast(cityId): Observable<any> {
    return this.http.get(this.apiUrl + '/forecast?id=' + cityId + this.key);
  }
}
