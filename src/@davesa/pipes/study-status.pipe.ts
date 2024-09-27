import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studyStatus',
  standalone: true

})
export class StudyStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case false:
        return "InActive"
      case true:
        return "Active"
      default:
        throw new Error(`Invalid Study Status Type`);
    }
  }
}
