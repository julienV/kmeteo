import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CityListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CityListProvider {
  filePath = 'assets/data/current.city.list.json';
  cities: any;

  constructor(public http: HttpClient) {
    this.cities = [];
    this.loadCities();
  }

  loadCities() {
    this.http
        .get(this.filePath)
        .subscribe((data) => {
          this.cities = data;
        });
  }

  search(term: string) {
    let res = [];

    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].name.toLowerCase().indexOf(term.toLowerCase()) !== -1) {
        res.push(this.cities[i]);
      }
    }

    return res;
  }
}