import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../models/models';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.html',
  styleUrls: ['./supplier-list.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTooltipModule
  ]
})
export class SupplierListComponent implements OnInit {
  suppliers: Supplier[] = [];
  filteredSuppliers: Supplier[] = [];
  searchTerm: string = '';
  showAddForm: boolean = false;
  editingId: number | null = null;
  displayedColumns: string[] = ['name', 'contactPerson', 'email', 'phone', 'city', 'isActive', 'actions'];

  newSupplier: Supplier = {
    id: 0,
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    isActive: true
  };

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe(suppliers => {
      this.suppliers = suppliers;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let filtered = [...this.suppliers];

    if (this.searchTerm.trim()) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(search) ||
        s.contactPerson.toLowerCase().includes(search) ||
        s.email.toLowerCase().includes(search) ||
        s.city.toLowerCase().includes(search)
      );
    }

    this.filteredSuppliers = filtered;
  }

  onSearch(): void {
    this.applyFilters();
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  addSupplier(): void {
    if (this.newSupplier.name && this.newSupplier.contactPerson && this.newSupplier.email) {
      this.supplierService.addSupplier(this.newSupplier).subscribe(() => {
        this.loadSuppliers();
        this.resetForm();
        this.showAddForm = false;
      });
    }
  }

  editSupplier(supplier: Supplier): void {
    this.editingId = supplier.id;
  }

  saveSupplier(supplier: Supplier): void {
    this.supplierService.updateSupplier(supplier).subscribe(() => {
      this.loadSuppliers();
      this.editingId = null;
    });
  }

  cancelEdit(): void {
    this.editingId = null;
    this.loadSuppliers();
  }

  deleteSupplier(id: number): void {
    if (confirm('Are you sure you want to delete this supplier?')) {
      this.supplierService.deleteSupplier(id).subscribe(() => {
        this.loadSuppliers();
      });
    }
  }

  toggleSupplierStatus(supplier: Supplier): void {
    supplier.isActive = !supplier.isActive;
    this.saveSupplier(supplier);
  }

  resetForm(): void {
    this.newSupplier = {
      id: 0,
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      isActive: true
    };
  }

  getActiveCount(): number {
    return this.suppliers.filter(s => s.isActive).length;
  }
}
