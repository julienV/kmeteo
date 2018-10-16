import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../../app/City';

/*
  Generated class for the ApiMeteoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiMeteoProvider {
  apiUrl = 'http://localhost:3000';

  constructor(public http: HttpClient) {
  }

  getCityFromPosition(position: {lat:number, lng: number}) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/latlng').subscribe(data => {
        resolve(new City(data));
      }, err => {
        console.log(err);
      });
    });
  }
}
