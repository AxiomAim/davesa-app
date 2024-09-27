import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByIndex',
  standalone: true
})
export class SortByIndexPipe implements PipeTransform {
  transform(value: any[], args?: any): any {
    const sortedValues = value.sort((a, b) => a.sort - b.sort);
    return sortedValues;
  }
}
