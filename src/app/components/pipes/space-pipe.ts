import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'space',
  standalone: false,
})
export class SpacePipe implements PipeTransform {

transform(value: string): string {
    if (!value) return value;
    
    return value.replace(/\\n/g, '\n');
  }

}
