# Inventory Management and Tracking System
## Comprehensive Project Documentation

---

## 📋 Overview

The **Inventory Management and Tracking System** is a modern, web-based Angular application designed to efficiently manage product stocks, suppliers, and purchase orders. Built with Angular 20, TypeScript, and Angular Material, it provides a robust, scalable, and user-friendly interface for inventory management.

### Key Features
- **Real-time Inventory Tracking**: Monitor stock levels, detect low-stock items, and manage reorder levels
- **Supplier Management**: Maintain comprehensive supplier information and active relationships
- **Order Tracking**: Create, update, and track purchase orders with real-time status updates
- **Dashboard Analytics**: View key inventory metrics and trends at a glance
- **Advanced Filtering & Search**: Find products, suppliers, and orders quickly
- **Form Validation**: Reactive forms with custom validators for data integrity
- **Material Design UI**: Modern, responsive interface with Material Design components
- **Error Handling**: HTTP interceptor for logging and error management

---

## 🏗️ Project Architecture

### Directory Structure
```
inventory-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   ├── product-list/
│   │   │   ├── product-detail/
│   │   │   ├── supplier-list/
│   │   │   └── order-tracker/
│   │   ├── services/
│   │   │   ├── product.service.ts
│   │   │   ├── supplier.service.ts
│   │   │   └── order.service.ts
│   │   ├── models/
│   │   │   └── models.ts
│   │   ├── pipes/
│   │   │   └── low-stock.pipe.ts
│   │   ├── directives/
│   │   │   └── highlight-reorder.directive.ts
│   │   ├── interceptors/
│   │   │   └── logging.interceptor.ts
│   │   ├── app.ts
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── package.json
└── angular.json
```

---

## 🔧 Technology Stack

### Core Technologies
- **Angular**: v20.3.0 - Modern responsive framework
- **TypeScript**: v5.9.2 - Type-safe programming
- **Angular Material**: v20.3.0 - UI component library
- **RxJS**: v7.8.0 - Reactive programming library

### Key Modules
- **HttpClientModule**: HTTP communication
- **ReactiveFormsModule**: Advanced form handling
- **RouterModule**: Application routing
- **CommonModule**: Common Angular directives

---

## 📊 Data Models

### Product
```typescript
interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  quantity: number;
  reorderLevel: number;
  price: number;
  supplierId: number;
  lastUpdated: Date;
}
```

### Supplier
```typescript
interface Supplier {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  isActive: boolean;
}
```

### Order
```typescript
interface Order {
  id: number;
  orderNumber: string;
  supplierId: number;
  items: OrderItem[];
  orderDate: Date;
  estimatedDelivery: Date;
  actualDelivery?: Date;
  status: 'pending' | 'received' | 'cancelled';
  totalAmount: number;
  notes: string;
}
```

---

## 🎯 Component Details

### Dashboard Component
**Purpose**: Display key inventory metrics and trends
- Real-time metrics cards
- Low-stock alerts table
- Pending orders display
- Visual indicators and status badges

**Features**:
- Automatic metrics calculation
- Color-coded status indicators
- Quick navigation links
- Responsive grid layout

### Product List Component
**Purpose**: Manage and display all products
- Advanced search functionality
- Multi-field sorting
- Reactive form for adding products
- Inline quantity updates
- Delete with confirmation

**Features**:
- Form validation with Material form fields
- Pattern validation for SKU (PROD-###)
- Real-time search filtering
- Material table with sticky headers
- Stock status indicators

### Product Detail Component
**Purpose**: View and edit individual product details
- Product information display
- Edit mode with form validation
- Quantity adjustment controls
- Inventory value calculation
- Supplier information link

**Features**:
- Progress bar for stock level
- Quick add/subtract buttons
- Form-based editing
- Delete functionality

### Supplier List Component
**Purpose**: Manage supplier information
- Supplier directory
- Add new suppliers
- Edit supplier details
- Toggle active/inactive status
- Search and filter

**Features**:
- Material table display
- Template-driven forms
- Active supplier indicator
- Contact information display

### Order Tracker Component
**Purpose**: Track purchase orders and status
- Order list with filtering
- Status-based filtering (pending, received, cancelled)
- Create new orders
- Update order status
- Search orders

**Features**:
- Multiple status options
- Date tracking
- Amount calculation
- Supplier association

---

## 🔄 Services and Data Flow

### ProductService
Manages all product-related operations:
- `getProducts()` - Retrieve all products
- `getProductById(id)` - Get specific product
- `addProduct(product)` - Create new product
- `updateProduct(product)` - Update product details
- `deleteProduct(id)` - Remove product
- `updateProductQuantity(id, quantity)` - Adjust stock
- `getLowStockProducts()` - Filter low-stock items
- `getTotalStock()` - Calculate total inventory

### SupplierService
Manages supplier operations:
- `getSuppliers()` - List all suppliers
- `getSupplierById(id)` - Get specific supplier
- `addSupplier(supplier)` - Create new supplier
- `updateSupplier(supplier)` - Update details
- `deleteSupplier(id)` - Remove supplier
- `getActiveSuppliers()` - Filter active suppliers

### OrderService
Manages order operations:
- `getOrders()` - Retrieve all orders
- `getOrderById(id)` - Get specific order
- `createOrder(order)` - Create new order
- `updateOrder(order)` - Update order
- `updateOrderStatus(id, status)` - Change status
- `deleteOrder(id)` - Remove order
- `getPendingOrders()` - Filter pending orders
- `getTotalOrderValue()` - Calculate pending value

---

## 🛠️ Directives and Pipes

### HighlightReorderDirective
Highlights products below reorder level:
```typescript
<tr [appHighlightReorder]="{ quantity: product.quantity, reorderLevel: product.reorderLevel }">
```
- Red background for critical stock
- Left border indicator
- Automatic styling based on stock level

### LowStockPipe
Filters products below reorder level:
```typescript
<div *ngFor="let product of products | lowStock">
```
- Returns filtered array of low-stock items
- Chainable with other pipes

---

## 📝 Forms Implementation

### Reactive Forms (Product List)
```typescript
productForm = this.formBuilder.group({
  name: ['', [Validators.required, Validators.minLength(2)]],
  sku: ['', [Validators.required, Validators.pattern(/^PROD-\d{3}$/)]],
  description: ['', Validators.minLength(5)],
  quantity: [0, [Validators.required, Validators.min(0)]],
  reorderLevel: [0, [Validators.required, Validators.min(1)]],
  price: [0, [Validators.required, Validators.min(0.01)]],
  supplierId: [1, Validators.required]
});
```

**Validation Rules**:
- Name: Required, min 2 characters
- SKU: Required, pattern PROD-### (e.g., PROD-001)
- Description: Optional, min 5 characters
- Quantity: Required, minimum 0
- Reorder Level: Required, minimum 1
- Price: Required, minimum 0.01

### Template-Driven Forms (Supplier List)
```html
<form ngForm (ngSubmit)="addSupplier()">
  <input [(ngModel)]="newSupplier.name" name="name" required />
  <input [(ngModel)]="newSupplier.email" name="email" email required />
</form>
```

---

## 🌐 Routing Configuration

```typescript
export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'suppliers', component: SupplierListComponent },
  { path: 'orders', component: OrderTrackerComponent }
];
```

---

## 📱 Responsive Design

### Breakpoints
- **Desktop**: Full layout with all features
- **Tablet (768px)**: Adjusted grid, optimized tables
- **Mobile (480px)**: Single column, simplified navigation

### Material Breakpoints
- `xs`: 0 - 600px
- `sm`: 600px - 960px
- `md`: 960px - 1264px
- `lg`: 1264px and above

---

## 🔐 HTTP Interceptor

### LoggingInterceptor
Logs all HTTP requests and errors:
- Logs outgoing requests with method and URL
- Logs successful responses
- Handles error responses with details
- Shows user-friendly error messages
- Supports both client-side and server-side errors

---

## 🎨 UI Components Used

### Material Components
- `MatToolbar` - Navigation bar
- `MatSidenav` - Side navigation
- `MatCard` - Content containers
- `MatTable` - Data tables
- `MatButton` - Action buttons
- `MatFormField` - Form input fields
- `MatInput` - Text inputs
- `MatSelect` - Dropdown selections
- `MatIcon` - Icons
- `MatListModule` - List display
- `MatSlideToggle` - Toggle switches
- `MatTooltip` - Hover help text
- `MatChips` - Tag display
- `MatProgressBar` - Progress indicators

---

## 🚀 Getting Started

### Installation
```bash
# Install dependencies
npm install

# Install Material (if not already included)
ng add @angular/material

# Install Angular Animations
npm install @angular/animations
```

### Running the Application
```bash
# Development server
npm start
# or
ng serve

# Application runs on http://localhost:4200
```

### Building
```bash
# Production build
npm run build
# or
ng build

# Build output in dist/inventory-app
```

### Testing
```bash
# Run unit tests
npm test
# or
ng test

# Run e2e tests
ng e2e
```

---

## 💡 Usage Examples

### Adding a Product
1. Navigate to Products from sidebar
2. Click "Add Product" button
3. Fill in required fields (Name, SKU, Quantity, Price)
4. Click "Add Product" to save
5. Form validates automatically

### Creating an Order
1. Go to Orders section
2. Click "Create Order"
3. Select supplier and items
4. Enter ordered quantities
5. System calculates total automatically

### Monitoring Stock
1. Dashboard shows metrics overview
2. Low-stock section lists items needing reorder
3. Color-coded status (Red=Critical, Orange=Low, Green=Good)
4. Click product to adjust quantity

---

## 🔄 Data Flow with RxJS

All services use RxJS Observables for reactive data management:

```typescript
// Component
products$ = this.productService.getProducts();

// Subscribe to updates
this.productService.getProducts().subscribe(products => {
  this.products = products;
});

// Service
private productsSubject = new BehaviorSubject<Product[]>([]);
products$ = this.productsSubject.asObservable();

getProducts(): Observable<Product[]> {
  return this.products$;
}
```

---

## 🎯 Best Practices Implemented

1. **Separation of Concerns**: Components, Services, Models
2. **Reactive Programming**: RxJS Observables for data
3. **Type Safety**: Full TypeScript implementation
4. **Validation**: Multi-level form validation
5. **Error Handling**: HTTP interceptor for errors
6. **Responsive Design**: Material breakpoints
7. **Accessibility**: ARIA labels and semantic HTML
8. **Code Organization**: Logical folder structure
9. **Reusable Components**: Shared services and directives
10. **Performance**: OnPush change detection ready

---

## 📈 Future Enhancements

- [ ] Authentication & Authorization
- [ ] Database integration (Firebase, MongoDB)
- [ ] Export to PDF/Excel
- [ ] Notifications/Alerts system
- [ ] Advanced reporting & analytics
- [ ] Multi-user collaboration
- [ ] Barcode scanning
- [ ] Inventory forecasting
- [ ] Supplier ratings system
- [ ] Offline mode support

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: Material components not rendering
**Solution**: Ensure `provideAnimations()` is in app.config.ts

**Issue**: Form validation not working
**Solution**: Check FormGroup binding and Validators configuration

**Issue**: Services not injecting
**Solution**: Verify `providedIn: 'root'` in @Injectable()

**Issue**: Routing not working
**Solution**: Check app.routes.ts configuration

---

## 📞 Support & Documentation

### Resources
- [Angular Documentation](https://angular.io)
- [Angular Material](https://material.angular.io)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org)

### Code Examples
Refer to individual component files for implementation details:
- `src/app/components/` - Component implementations
- `src/app/services/` - Service implementations
- `src/app/models/` - Data model definitions

---

## 📄 License

This project is part of the inventory management training/demo suite.

---

## ✅ Completion Checklist

- [x] Project initialization with Angular CLI
- [x] TypeScript interfaces and models
- [x] Component-based architecture
- [x] Service layer with RxJS
- [x] Routing and navigation
- [x] Reactive Forms with validation
- [x] Template-driven forms
- [x] Angular Material UI
- [x] Custom pipes and directives
- [x] HTTP Interceptor
- [x] Responsive design
- [x] Search and filtering
- [x] Data binding and event handling
- [x] Dependency injection
- [x] Real-time metrics dashboard
- [x] CRUD operations

---

**Last Updated**: March 9, 2026
**Version**: 1.0.0
**Status**: ✅ Complete
