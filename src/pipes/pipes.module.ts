import { NgModule } from '@angular/core';
import { WeatherIconPipe } from './weather-icon/weather-icon';
import { CelciusPipe } from './celcius/celcius';

@NgModule({
	declarations: [WeatherIconPipe, CelciusPipe],
	imports: [],
	exports: [WeatherIconPipe, CelciusPipe]
})
export class PipesModule {}
