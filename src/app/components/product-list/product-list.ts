import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { SupplierService } from '../../services/supplier.service';
import { Product, Supplier } from '../../models/models';
import { HighlightReorderDirective } from '../../directives/highlight-reorder.directive';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    HighlightReorderDirective
  ]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  suppliers: Supplier[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  sortBy: 'name' | 'quantity' | 'price' = 'name';
  showAddForm: boolean = false;
  displayedColumns: string[] = ['name', 'sku', 'quantity', 'reorderLevel', 'price', 'status', 'actions'];

  productForm: FormGroup;

  constructor(
    private productService: ProductService,
    private supplierService: SupplierService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      sku: ['', [Validators.required, Validators.pattern(/^PROD-\d{3}$/)]],
      description: ['', Validators.minLength(5)],
      quantity: [0, [Validators.required, Validators.min(0)]],
      reorderLevel: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      supplierId: [1, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadSuppliers();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.applyFilters();
    });
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe(suppliers => {
      this.suppliers = suppliers;
    });
  }

  applyFilters(): void {
    let filtered = [...this.products];

    // Apply search filter
    if (this.searchTerm.trim()) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.sku.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (this.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (this.sortBy === 'quantity') {
        return a.quantity - b.quantity;
      } else if (this.sortBy === 'price') {
        return a.price - b.price;
      }
      return 0;
    });

    this.filteredProducts = filtered;
  }

  onSearch(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.productForm.reset();
    }
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const newProduct: Product = {
        id: 0,
        ...this.productForm.value,
        lastUpdated: new Date()
      };
      this.productService.addProduct(newProduct).subscribe(() => {
        this.loadProducts();
        this.productForm.reset();
        this.showAddForm = false;
      });
    }
  }

  updateQuantity(product: Product, newQuantity: number): void {
    if (newQuantity >= 0) {
      this.productService.updateProductQuantity(product.id, newQuantity).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  getStockStatus(product: Product): string {
    if (product.quantity <= product.reorderLevel) {
      return 'low';
    }
    if (product.quantity <= product.reorderLevel * 1.5) {
      return 'medium';
    }
    return 'good';
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'low':
        return '#d32f2f';
      case 'medium':
        return '#ff9800';
      default:
        return '#388e3c';
    }
  }
}