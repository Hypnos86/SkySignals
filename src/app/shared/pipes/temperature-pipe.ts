import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperaturePipe'
})
export class TemperaturePipe implements PipeTransform {

  transform(value: string):unknown {
    if(!value){
      return ""
    } else {
      return value.concat(' °C');
    }
  }
}
