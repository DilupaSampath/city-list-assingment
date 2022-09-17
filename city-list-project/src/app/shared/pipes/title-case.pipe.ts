import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textTitleCasePipe'
})
export class TextTitleCasePipe implements PipeTransform {

  transform(value: string): string {

    if (value === undefined || value === null) {
      return '';
    }
    return this.titleCase(value);
  }

  titleCase(data: string){
    return data[0].toUpperCase() + data.slice(1).toLowerCase();
  }

}
