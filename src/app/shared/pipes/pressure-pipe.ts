import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pressurePipe'
})
export class PressurePipe implements PipeTransform {

  transform(value:string){
    if(!value){
      return ""
    }else {
      return value.concat(" hPa")
    }
  }

}
