import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CityDetailsPage } from '../pages/city-details/city-details';

import { ApiMeteoProvider } from '../providers/api-meteo/api-meteo';
import { CityListProvider } from '../providers/city-list/city-list';

import { CityRowComponent } from '../components/city-row/city-row';

import { PipesModule } from '../pipes/pipes.module';
import { CelciusPipe } from '../pipes/celcius/celcius';
import { WeatherIconPipe } from '../pipes/weather-icon/weather-icon';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CityRowComponent,
    CityDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CityDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiMeteoProvider,
    CityListProvider
  ]
})
export class AppModule {}
