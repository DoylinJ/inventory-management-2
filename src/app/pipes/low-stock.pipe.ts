import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/models';

@Pipe({
  name: 'lowStock',
  standalone: true
})
export class LowStockPipe implements PipeTransform {
  transform(products: Product[]): Product[] {
    if (!products || products.length === 0) {
      return [];
    }
    return products.filter(p => p.quantity <= p.reorderLevel);
  }
}
