import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductService } from '../../services/product.service';
import { SupplierService } from '../../services/supplier.service';
import { Product, Supplier } from '../../models/models';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBarModule,
    MatTooltipModule
  ]
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  supplier: Supplier | null = null;
  isEditing: boolean = false;
  productForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private supplierService: SupplierService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      sku: ['', Validators.required],
      description: [''],
      quantity: [0, Validators.min(0)],
      reorderLevel: [0, Validators.min(1)],
      price: [0, Validators.min(0.01)]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = parseInt(params['id'], 10);
      if (id) {
        this.loadProduct(id);
      }
    });
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe(product => {
      if (product) {
        this.product = product;
        this.productForm.patchValue(product);
        this.loadSupplier(product.supplierId);
      } else {
        this.errorMessage = 'Product not found';
      }
    });
  }

  loadSupplier(supplierId: number): void {
    this.supplierService.getSupplierById(supplierId).subscribe(supplier => {
      this.supplier = supplier || null;
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  saveChanges(): void {
    if (this.productForm.valid && this.product) {
      const updatedProduct: Product = {
        ...this.product,
        ...this.productForm.value,
        lastUpdated: new Date()
      };
      this.productService.updateProduct(updatedProduct).subscribe(() => {
        this.product = updatedProduct;
        this.isEditing = false;
        this.successMessage = 'Product updated successfully!';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      });
    }
  }

  updateQuantity(action: 'add' | 'subtract'): void {
    if (this.product) {
      let newQuantity = this.product.quantity;
      if (action === 'add') {
        newQuantity += 1;
      } else if (action === 'subtract' && newQuantity > 0) {
        newQuantity -= 1;
      }
      this.productService.updateProductQuantity(this.product.id, newQuantity).subscribe(() => {
        if (this.product) {
          this.product.quantity = newQuantity;
          this.productForm.patchValue({ quantity: newQuantity });
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  deleteProduct(): void {
    if (this.product && confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.product.id).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

  getStockPercentage(): number {
    if (!this.product) return 0;
    const maxStock = this.product.reorderLevel * 3;
    return Math.min((this.product.quantity / maxStock) * 100, 100);
  }

  getInventoryValue(): number {
    if (!this.product) return 0;
    return this.product.price * this.product.quantity;
  }

  getStockStatus(): string {
    if (!this.product) return 'unknown';
    if (this.product.quantity <= this.product.reorderLevel) return 'critical';
    if (this.product.quantity <= this.product.reorderLevel * 1.5) return 'low';
    return 'good';
  }

  getStockStatusClass(): string {
    if (!this.product) return '';
    if (this.product.quantity <= this.product.reorderLevel) {
      return 'status-critical';
    }
    if (this.product.quantity <= this.product.reorderLevel * 1.5) {
      return 'status-low';
    }
    return 'status-good';
  }
}
