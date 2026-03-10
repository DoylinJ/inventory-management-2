import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Product } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3002';
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private initialized = false;

  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  private ensureInitialized(): Observable<Product[]> {
    if (!this.initialized) {
      return this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
        tap(products => {
          this.productsSubject.next(products);
          this.initialized = true;
        })
      );
    }
    return this.products$;
  }

  getProducts(): Observable<Product[]> {
    return this.ensureInitialized();
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
      map(product => product)
    );
  }

  addProduct(product: Product): Observable<Product> {
    const newProduct = {
      ...product,
      id: Math.max(...this.productsSubject.value.map(p => p.id), 0) + 1,
      lastUpdated: new Date()
    };
    return this.http.post<Product>(`${this.apiUrl}/products`, newProduct).pipe(
      tap(addedProduct => {
        const updatedProducts = [...this.productsSubject.value, addedProduct];
        this.productsSubject.next(updatedProducts);
      })
    );
  }

  updateProduct(product: Product): Observable<Product> {
    const updatedProduct = { ...product, lastUpdated: new Date() };
    return this.http.put<Product>(`${this.apiUrl}/products/${product.id}`, updatedProduct).pipe(
      tap(() => {
        const updatedProducts = this.productsSubject.value.map(p =>
          p.id === product.id ? updatedProduct : p
        );
        this.productsSubject.next(updatedProducts);
      })
    );
  }

  updateProductQuantity(id: number, quantity: number): Observable<Product | undefined> {
    return this.getProductById(id).pipe(
      map(product => {
        if (product) {
          const updatedProduct = { ...product, quantity, lastUpdated: new Date() };
          this.http.put<Product>(`${this.apiUrl}/products/${id}`, updatedProduct).subscribe(() => {
            const updatedProducts = this.productsSubject.value.map(p =>
              p.id === id ? updatedProduct : p
            );
            this.productsSubject.next(updatedProducts);
          });
          return updatedProduct;
        }
        return undefined;
      })
    );
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/products/${id}`).pipe(
      map(() => {
        const updatedProducts = this.productsSubject.value.filter(p => p.id !== id);
        this.productsSubject.next(updatedProducts);
        return true;
      })
    );
  }

  getLowStockProducts(): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(p => p.quantity <= p.reorderLevel))
    );
  }

  getTotalStock(): Observable<number> {
    return this.getProducts().pipe(
      map(products => products.reduce((sum, p) => sum + p.quantity, 0))
    );
  }
}
