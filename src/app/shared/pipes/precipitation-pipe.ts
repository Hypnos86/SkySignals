import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precipitationPipe',
})
export class PrecipitationPipe implements PipeTransform {
  transform(value: number | string | null | undefined): string {
    const amount = Number(value);

    if (isNaN(amount) || amount === 0) {
      return 'Brak opadów';
    }

    return `${amount} mm`;
  }
}
