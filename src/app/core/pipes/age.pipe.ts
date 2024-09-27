import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'age',
  standalone: true
})
export class AgePipe implements PipeTransform {

  transform(value: string): number {
    return moment().diff(moment(value), "years")
  }

}