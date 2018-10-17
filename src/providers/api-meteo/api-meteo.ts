import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../../app/City';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';

/*
  Generated class for the ApiMeteoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiMeteoProvider {
  apiUrl = 'http://localhost:3000';

  constructor(public http: HttpClient, public storage: Storage, public geolocation: Geolocation) {
  };  

  getCityFromPosition(): Observable<City> {
    return Observable.fromPromise(this.geolocation.getCurrentPosition())
      .mergeMap((resp) => {
        return this.http.get<City>(this.apiUrl + '/latlng')
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
          observables.push(this.http.get<City>(this.apiUrl + '/city/0'));
        }

        return Observable.forkJoin(observables);
      });
  }
}
