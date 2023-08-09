import { Pipe, PipeTransform } from '@angular/core';
import { EntryExit } from '../models/entry-exit.model';

@Pipe({
  name: 'orderEntyExit'
})
export class OrderEntyExitPipe implements PipeTransform {

  transform(items: EntryExit[]): EntryExit[] {
    return items.sort((a, b) => a.type === 'entry' ? -1 : 1);
  }

}
