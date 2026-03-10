import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductService } from '../../services/product.service';
import { SupplierService } from '../../services/supplier.service';
import { OrderService } from '../../services/order.service';
import { InventoryMetrics, Product, Supplier, Order } from '../../models/models';
import { HighlightReorderDirective } from '../../directives/highlight-reorder.directive';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    HighlightReorderDirective
  ]
})
export class DashboardComponent implements OnInit {
  metrics: InventoryMetrics = {
    totalProducts: 0,
    totalStock: 0,
    lowStockProducts: 0,
    activeSuppliersCount: 0,
    pendingOrders: 0,
    totalOrderValue: 0
  };

  recentLowStockProducts: Product[] = [];
  recentOrders: Order[] = [];
  displayedColumns: string[] = ['name', 'sku', 'quantity', 'reorderLevel'];
  orderColumns: string[] = ['orderNumber', 'status', 'totalAmount', 'estimatedDelivery'];

  constructor(
    private productService: ProductService,
    private supplierService: SupplierService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadMetrics();
  }

  loadMetrics(): void {
    // Get all products
    this.productService.getProducts().subscribe(products => {
      this.metrics.totalProducts = products.length;
    });

    // Get total stock
    this.productService.getTotalStock().subscribe(stock => {
      this.metrics.totalStock = stock;
    });

    // Get low stock products
    this.productService.getLowStockProducts().subscribe(lowStock => {
      this.metrics.lowStockProducts = lowStock.length;
      this.recentLowStockProducts = lowStock.slice(0, 5);
    });

    // Get active suppliers
    this.supplierService.getActiveSuppliers().subscribe(suppliers => {
      this.metrics.activeSuppliersCount = suppliers.length;
    });

    // Get pending orders
    this.orderService.getPendingOrders().subscribe(pendingOrders => {
      this.metrics.pendingOrders = pendingOrders.length;
      this.recentOrders = pendingOrders.slice(0, 5);
    });

    // Get total order value
    this.orderService.getTotalOrderValue().subscribe(totalValue => {
      this.metrics.totalOrderValue = totalValue;
    });
  }
}