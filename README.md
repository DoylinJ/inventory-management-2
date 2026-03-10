# 📦 Inventory Management and Tracking System

![Angular](https://img.shields.io/badge/Angular-20.3.0-red?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?style=flat-square)
![Material](https://img.shields.io/badge/Material-20.3.0-purple?style=flat-square)
![RxJS](https://img.shields.io/badge/RxJS-7.8.0-orange?style=flat-square)

A modern, enterprise-grade web application for managing inventory, tracking suppliers, and monitoring purchase orders. Built with Angular 20, TypeScript, and Angular Material for a professional, responsive user experience.

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm v9+
- Angular CLI v20+

### Installation

```bash
# Clone the repository
cd inventory-app

# Install dependencies
npm install

# Start the mock backend API
npm run json-server

# Start development server (in a new terminal)
npm start

# Open in browser
# Navigate to http://localhost:4200
```

---

## 🛠️ Development Setup

### Mock Backend
The application uses JSON Server for mock API endpoints:

```bash
# Start JSON Server on port 3002
npm run json-server

# API endpoints available:
# GET/POST/PUT/DELETE /products
# GET/POST/PUT/DELETE /suppliers
# GET/POST/PUT/DELETE /orders
```

### Available Scripts

```bash
npm start          # Start Angular dev server
npm run build      # Build for production
npm run json-server # Start mock API server
npm test           # Run unit tests
```

---

## ✨ Features

### 📊 Dashboard
- Real-time inventory metrics
- Low-stock alerts
- Pending orders overview
- Visual status indicators
- Quick navigation to modules

### 📦 Product Management
- Complete product inventory view
- Add/Edit/Delete products
- Real-time search and filtering
- Multi-field sorting
- Stock status tracking
- Supplier association
- Reactive form validation

### 🏢 Supplier Management
- Supplier directory
- Contact information management
- Active/Inactive status toggle
- Search and filter capabilities
- Email and phone tracking

### 📋 Order Tracking
- Purchase order management
- Order status tracking (Pending/Received/Cancelled)
- Date and amount tracking
- Supplier association
- Order history
- Real-time status updates

### 🎨 UI/UX
- Material Design components
- Responsive layout (Desktop, Tablet, Mobile)
- Intuitive navigation
- Color-coded status indicators
- Accessible design

### 🔧 Technical Features
- Reactive programming with RxJS
- Reactive Forms with validation
- Custom pipes and directives
- HTTP error handling
- Dependency injection
- Standalone components
- TypeScript type safety

---

## 📚 Documentation

### For Developers
- **[PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)** - Complete project reference
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design and patterns
- **[QUICK_START.md](QUICK_START.md)** - Usage guide and examples

### Key Sections
1. **Project Overview** - Feature list and objectives
2. **Architecture** - Data flow and component hierarchy
3. **Components** - Individual component details
4. **Services** - Business logic and data management
5. **Models** - Data structure definitions
6. **Usage Guide** - How to use the application

---

## 🏗️ Project Structure

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
├── PROJECT_DOCUMENTATION.md
├── ARCHITECTURE.md
├── QUICK_START.md
├── package.json
└── angular.json
```

---

## 🔧 Built With

### Frontend Framework
- **Angular v20.3.0** - Modern reactive framework
- **TypeScript v5.9.2** - Type-safe programming

### UI Library
- **Angular Material v20.3.0** - Professional components
- **Material Icons** - Icon library

### State Management
- **RxJS v7.8.0** - Reactive programming
- **BehaviorSubject** - State management

### Forms
- **Reactive Forms** - Advanced form handling
- **Form Validation** - Complex validation rules

---

## 📊 Data Models

### Product
```typescript
{
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
{
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
{
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

## 🎯 Main Components

### Dashboard Component
- Displays key metrics cards
- Shows low-stock alerts
- Lists pending orders
- Real-time calculations
- Quick navigation links

### Product List Component
- Table view of all products
- Search functionality
- Sorting options
- Add product form
- Delete with confirmation
- Reactive form validation

### Product Detail Component
- Detailed product view
- Edit capabilities
- Quantity adjustment
- Stock level indicators
- Supplier information
- Inventory value calculation

### Supplier List Component
- Supplier directory
- Add/Edit suppliers
- Status management
- Search and filter
- Contact information

### Order Tracker Component
- Order overview table
- Status filtering
- Create orders
- Status updates
- Order history

---

## 🔄 Services

### ProductService
Manages product data and operations
```typescript
- getProducts(): Observable<Product[]>
- getProductById(id): Observable<Product | undefined>
- addProduct(product): Observable<Product>
- updateProduct(product): Observable<Product>
- deleteProduct(id): Observable<boolean>
- updateProductQuantity(id, quantity): Observable<Product | undefined>
- getLowStockProducts(): Observable<Product[]>
- getTotalStock(): Observable<number>
```

### SupplierService
Manages supplier information
```typescript
- getSuppliers(): Observable<Supplier[]>
- getSupplierById(id): Observable<Supplier | undefined>
- addSupplier(supplier): Observable<Supplier>
- updateSupplier(supplier): Observable<Supplier>
- deleteSupplier(id): Observable<boolean>
- getActiveSuppliers(): Observable<Supplier[]>
```

### OrderService
Manages order operations
```typescript
- getOrders(): Observable<Order[]>
- getOrderById(id): Observable<Order | undefined>
- createOrder(order): Observable<Order>
- updateOrder(order): Observable<Order>
- updateOrderStatus(id, status): Observable<Order | undefined>
- deleteOrder(id): Observable<boolean>
- getPendingOrders(): Observable<Order[]>
- getTotalOrderValue(): Observable<number>
```

---

## 🛠️ Available Commands

### Development
```bash
npm start          # Start dev server (ng serve)
npm test           # Run tests (ng test)
ng generate        # Generate component/service/etc
```

### Building
```bash
npm run build      # Production build (ng build)
npm run watch      # Watch mode build
```

### Deployment
```bash
ng build --configuration production
# Output in dist/inventory-app/
```

---

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1264px+) - Full feature set
- **Tablet** (960px-1264px) - Adapted layout
- **Mobile** (< 960px) - Touch-optimized interface

---

## 🔐 Features

### Data Validation
- ✅ Reactive form validation
- ✅ Pattern matching (SKU format)
- ✅ Min/Max constraints
- ✅ Required field validation
- ✅ Email validation

### Error Handling
- ✅ HTTP error interception
- ✅ User-friendly error messages
- ✅ Network error handling
- ✅ Form validation feedback

### Security
- ✅ Angular sanitization (XSS protection)
- ✅ Type safety with TypeScript
- ✅ Input validation
- ✅ CSRF-ready architecture

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize Firebase
firebase init

# Deploy
firebase deploy
```

### Deploy to Other Platforms
- Netlify: Drop dist folder or connect to GitHub
- Vercel: Import project and deploy
- AWS S3: Upload dist folder to S3 bucket
- Apache/Nginx: Copy dist to www directory

---

## 🎓 Learning Resources

### Angular Documentation
- [Angular Official Docs](https://angular.io)
- [Angular Material](https://material.angular.io)
- [RxJS Guide](https://rxjs.dev)

### Reference Documentation in Project
- [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md) - Comprehensive guide
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design
- [QUICK_START.md](QUICK_START.md) - Usage examples

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: Module not found error
```bash
# Solution: Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Port 4200 already in use
```bash
# Solution: Use different port
ng serve --port 4201
```

**Issue**: Material styles not loading
```bash
# Solution: Ensure styles.css includes Material theme
@import "@angular/material/prebuilt-themes/indigo-pink.css";
```

**Issue**: Form validation not working
```typescript
// Ensure ReactiveFormsModule is imported
ReactiveFormsModule  // Components import
```

---

## 🗂️ Project Statistics

- **Components**: 5 main components
- **Services**: 3 core services
- **Models**: 5 TypeScript interfaces
- **Custom Pipes**: 1 (Low Stock Filter)
- **Custom Directives**: 1 (Highlight Reorder)
- **Lines of Code**: ~2,500+
- **Documentation**: 4 comprehensive guides

---

## 🔮 Future Enhancements

- [ ] Firebase/Database integration
- [ ] User authentication
- [ ] Advanced reporting
- [ ] File export (PDF/Excel)
- [ ] Email notifications
- [ ] Barcode scanning
- [ ] Inventory forecasting
- [ ] Multi-user support
- [ ] Real-time collaboration
- [ ] Mobile app version

---

## 📄 License

This project is provided as educational material.

---

## ✅ Implementation Checklist

- [x] Project initialization
- [x] Angular Material setup
- [x] Component development
- [x] Service layer
- [x] Routing configuration
- [x] Form implementation
- [x] Data models
- [x] Custom pipes
- [x] Custom directives
- [x] HTTP interceptor
- [x] Responsive design
- [x] Search and filtering
- [x] Data binding
- [x] Error handling
- [x] Documentation

---

## 🆘 Support

For detailed information:
1. Check [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)
2. Review [ARCHITECTURE.md](ARCHITECTURE.md)
3. Follow [QUICK_START.md](QUICK_START.md)
4. Inspect source code comments

---

## 🎉 Get Started

```bash
npm install      # Install dependencies
npm start        # Start application
```

**Then navigate to `http://localhost:4200`**

---

**Project Status**: ✅ Complete  
**Version**: 1.0.0  
**Last Updated**: March 9, 2026

Happy coding! 🚀

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
