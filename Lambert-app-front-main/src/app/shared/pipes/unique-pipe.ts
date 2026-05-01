import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique',
  standalone: true
})
export class UniquePipe implements PipeTransform {
  transform<T>(items: T[] | null | undefined, key: keyof T): T[] {
    if (!items || !key) return items || [];
    const seen = new Set<any>();
    return items.filter((item) => {
      const val = item[key];
      if (seen.has(val)) return false;
      seen.add(val);
      return true;
    });
  }
}
