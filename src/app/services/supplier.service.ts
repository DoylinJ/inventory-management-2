import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Supplier } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl = 'http://localhost:3002';
  private suppliersSubject = new BehaviorSubject<Supplier[]>([]);
  private initialized = false;

  suppliers$ = this.suppliersSubject.asObservable();

  constructor(private http: HttpClient) {}

  private ensureInitialized(): Observable<Supplier[]> {
    if (!this.initialized) {
      return this.http.get<Supplier[]>(`${this.apiUrl}/suppliers`).pipe(
        tap(suppliers => {
          this.suppliersSubject.next(suppliers);
          this.initialized = true;
        })
      );
    }
    return this.suppliers$;
  }

  getSuppliers(): Observable<Supplier[]> {
    return this.ensureInitialized();
  }

  getSupplierById(id: number): Observable<Supplier | undefined> {
    return this.http.get<Supplier>(`${this.apiUrl}/suppliers/${id}`).pipe(
      map(supplier => supplier)
    );
  }

  addSupplier(supplier: Supplier): Observable<Supplier> {
    const newSupplier = {
      ...supplier,
      id: Math.max(...this.suppliersSubject.value.map(s => s.id), 0) + 1
    };
    return this.http.post<Supplier>(`${this.apiUrl}/suppliers`, newSupplier).pipe(
      tap(addedSupplier => {
        const updatedSuppliers = [...this.suppliersSubject.value, addedSupplier];
        this.suppliersSubject.next(updatedSuppliers);
      })
    );
  }

  updateSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.apiUrl}/suppliers/${supplier.id}`, supplier).pipe(
      tap(() => {
        const updatedSuppliers = this.suppliersSubject.value.map(s =>
          s.id === supplier.id ? supplier : s
        );
        this.suppliersSubject.next(updatedSuppliers);
      })
    );
  }

  deleteSupplier(id: number): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/suppliers/${id}`).pipe(
      map(() => {
        const updatedSuppliers = this.suppliersSubject.value.filter(s => s.id !== id);
        this.suppliersSubject.next(updatedSuppliers);
        return true;
      })
    );
  }

  getActiveSuppliers(): Observable<Supplier[]> {
    return this.getSuppliers().pipe(
      map(suppliers => suppliers.filter(s => s.isActive))
    );
  }
}
