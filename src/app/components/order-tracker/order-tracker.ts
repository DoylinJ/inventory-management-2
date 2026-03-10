import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { SupplierService } from '../../services/supplier.service';
import { Order, Product, Supplier } from '../../models/models';

@Component({
  selector: 'app-order-tracker',
  templateUrl: './order-tracker.html',
  styleUrls: ['./order-tracker.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule
  ]
})
export class OrderTrackerComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  products: Product[] = [];
  suppliers: Supplier[] = [];

  searchTerm: string = '';
  filterStatus: 'all' | 'pending' | 'received' | 'cancelled' = 'all';
  showAddForm: boolean = false;
  displayedColumns: string[] = ['orderNumber', 'supplierId', 'orderDate', 'estimatedDelivery', 'status', 'totalAmount', 'actions'];

  newOrder: Order = {
    id: 0,
    orderNumber: '',
    supplierId: 1,
    items: [],
    orderDate: new Date(),
    estimatedDelivery: new Date(),
    status: 'pending',
    totalAmount: 0,
    notes: ''
  };

  selectedProductId: number = 0;
  selectedQuantity: number = 0;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadProducts();
    this.loadSuppliers();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.applyFilters();
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe(suppliers => {
      this.suppliers = suppliers;
    });
  }

  applyFilters(): void {
    let filtered = [...this.orders];

    // Filter by search term
    if (this.searchTerm.trim()) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(o =>
        o.orderNumber.toLowerCase().includes(search) ||
        o.notes.toLowerCase().includes(search)
      );
    }

    // Filter by status
    if (this.filterStatus !== 'all') {
      filtered = filtered.filter(o => o.status === this.filterStatus);
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());

    this.filteredOrders = filtered;
  }

  onSearch(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  addOrder(): void {
    if (this.newOrder.orderNumber && this.newOrder.items.length > 0) {
      this.orderService.createOrder(this.newOrder).subscribe(() => {
        this.loadOrders();
        this.resetForm();
        this.showAddForm = false;
      });
    }
  }

  updateOrderStatus(order: Order, newStatus: 'pending' | 'received' | 'cancelled'): void {
    this.orderService.updateOrderStatus(order, newStatus).subscribe(() => {
      this.loadOrders();
    });
  }

  deleteOrder(id: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(id).subscribe(() => {
        this.loadOrders();
      });
    }
  }

  resetForm(): void {
    this.newOrder = {
      id: 0,
      orderNumber: '',
      supplierId: 1,
      items: [],
      orderDate: new Date(),
      estimatedDelivery: new Date(),
      status: 'pending',
      totalAmount: 0,
      notes: ''
    };
    this.selectedProductId = 0;
    this.selectedQuantity = 0;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pending':
        return 'warn';
      case 'received':
        return 'accent';
      case 'cancelled':
        return 'primary';
      default:
        return '';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'pending':
        return 'schedule';
      case 'received':
        return 'check_circle';
      case 'cancelled':
        return 'cancel';
      default:
        return '';
    }
  }

  getSupplierName(supplierId: number): string {
    const supplier = this.suppliers.find(s => s.id === supplierId);
    return supplier ? supplier.name : 'Unknown';
  }

  getPendingOrdersCount(): number {
    return this.orders.filter(o => o.status === 'pending').length;
  }

  getTotalPendingValue(): number {
    return this.orders
      .filter(o => o.status === 'pending')
      .reduce((sum, o) => sum + o.totalAmount, 0);
  }

  getOrderStats() {
    return {
      total: this.orders.length,
      pending: this.orders.filter(o => o.status === 'pending').length,
      received: this.orders.filter(o => o.status === 'received').length,
      cancelled: this.orders.filter(o => o.status === 'cancelled').length
    };
  }

  addItemToOrder(): void {
    if (this.selectedProductId > 0 && this.selectedQuantity > 0) {
      const product = this.products.find(p => p.id === this.selectedProductId);
      if (product) {
        const existingItem = this.newOrder.items.find(i => i.productId === this.selectedProductId);
        if (existingItem) {
          existingItem.quantity += this.selectedQuantity;
        } else {
          this.newOrder.items.push({
            id: this.newOrder.items.length + 1,
            productId: this.selectedProductId,
            quantity: this.selectedQuantity,
            unitPrice: product.price
          });
        }
        this.calculateOrderTotal();
        this.selectedProductId = 0;
        this.selectedQuantity = 0;
      }
    }
  }

  removeItemFromOrder(index: number): void {
    this.newOrder.items.splice(index, 1);
    this.calculateOrderTotal();
  }

  calculateOrderTotal(): void {
    this.newOrder.totalAmount = this.newOrder.items.reduce(
      (sum, item) => sum + (item.quantity * item.unitPrice),
      0
    );
  }

  createOrder(): void {
    if (this.newOrder.orderNumber && this.newOrder.supplierId && this.newOrder.items.length > 0) {
      this.orderService.createOrder(this.newOrder).subscribe(() => {
        this.loadOrders();
        this.resetForm();
        this.showAddForm = false;
      });
    }
  }

  getProductName(productId: number): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.name : 'Unknown';
  }
}