import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humidityPipe',
})
export class HumidityPipe implements PipeTransform {

  transform(value:any) {
    if (!value) {
      return '';
    } else {
      return value.concat("%");
    }
  }
}
