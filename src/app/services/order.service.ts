import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Order, OrderItem } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3002';
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  private initialized = false;

  orders$ = this.ordersSubject.asObservable();

  constructor(private http: HttpClient) {}

  private ensureInitialized(): Observable<Order[]> {
    if (!this.initialized) {
      return this.http.get<Order[]>(`${this.apiUrl}/orders`).pipe(
        tap(orders => {
          this.ordersSubject.next(orders);
          this.initialized = true;
        })
      );
    }
    return this.orders$;
  }

  getOrders(): Observable<Order[]> {
    return this.ensureInitialized();
  }

  getOrderById(id: number): Observable<Order | undefined> {
    return this.http.get<Order>(`${this.apiUrl}/orders/${id}`).pipe(
      map(order => order)
    );
  }

  getOrdersBySupplier(supplierId: number): Observable<Order[]> {
    return this.getOrders().pipe(
      map(orders => orders.filter(o => o.supplierId === supplierId))
    );
  }

  createOrder(order: Order): Observable<Order> {
    const newOrder = {
      ...order,
      id: Math.max(...this.ordersSubject.value.map(o => o.id), 0) + 1
    };
    return this.http.post<Order>(`${this.apiUrl}/orders`, newOrder).pipe(
      tap(addedOrder => {
        const updatedOrders = [...this.ordersSubject.value, addedOrder];
        this.ordersSubject.next(updatedOrders);
      })
    );
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/orders/${order.id}`, order).pipe(
      tap(() => {
        const updatedOrders = this.ordersSubject.value.map(o =>
          o.id === order.id ? order : o
        );
        this.ordersSubject.next(updatedOrders);
      })
    );
  }

  updateOrderStatus(order: Order, status: 'pending' | 'received' | 'cancelled'): Observable<Order | undefined> {
    const updatedOrder = {
      ...order,
      status,
      actualDelivery: status === 'received' ? new Date() : order.actualDelivery
    };
    return this.http.put<Order>(`${this.apiUrl}/orders/${order.id}`, updatedOrder).pipe(
      tap(() => {
        const updatedOrders = this.ordersSubject.value.map(o =>
          o.id === order.id ? updatedOrder : o
        );
        this.ordersSubject.next(updatedOrders);
      }),
      map(() => updatedOrder)
    );
  }

  deleteOrder(id: number): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/orders/${id}`).pipe(
      map(() => {
        const updatedOrders = this.ordersSubject.value.filter(o => o.id !== id);
        this.ordersSubject.next(updatedOrders);
        return true;
      })
    );
  }

  getPendingOrders(): Observable<Order[]> {
    return this.getOrders().pipe(
      map(orders => orders.filter(o => o.status === 'pending'))
    );
  }

  getTotalOrderValue(): Observable<number> {
    return this.getPendingOrders().pipe(
      map(pendingOrders => pendingOrders.reduce((sum, o) => sum + o.totalAmount, 0))
    );
  }
}