import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CelciusPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'celcius',
})
export class CelciusPipe implements PipeTransform {
  /**
   * Transform Kelvin temperature to rounded Celsius
   */
  transform(value: number) {
    return Math.round(value - 273.15);
  }
}
