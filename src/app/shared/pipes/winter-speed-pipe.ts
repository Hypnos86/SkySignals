import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'winterSpeedPipe',
})
export class WinterSpeedPipe implements PipeTransform {
  transform(value: string) {
    if (!value) {
      return '';
    } else {
      return value.concat(' km/h');
    }
  }
}
