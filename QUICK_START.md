# Quick Start Guide - Inventory Management System

## 🚀 Setup and Installation

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher
- Angular CLI v20 or higher

### Installation Steps

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm start

# 3. Open browser
# Navigate to http://localhost:4200
```

## 📊 Main Features Overview

### 1. Dashboard
**Navigate**: Click "Dashboard" in sidebar
- View key inventory metrics
- See low-stock alerts
- Track pending orders
- Quick overview of system status

### 2. Product Management
**Navigate**: Click "Products" in sidebar

#### Viewing Products
- See all products in a sortable table
- Sort by Name, Quantity, or Price
- Search products by name, SKU, or description
- View product status (Good/Medium/Low stock)

#### Adding Products
1. Click "+ Add Product" button
2. Fill in the form:
   - **Name** (required, min 2 chars)
   - **SKU** (required, format: PROD-###, e.g., PROD-001)
   - **Description** (optional, min 5 chars)
   - **Quantity** (required, must be ≥ 0)
   - **Reorder Level** (required, minimum value to trigger alert)
   - **Price** (required, must be > 0)
   - **Supplier** (select from dropdown)
3. Click "Add Product"
4. Product appears in list immediately

#### Viewing Product Details
1. Click the visibility icon in the Actions column
2. View complete product information
3. See supplier details
4. Edit or delete product

#### Editing Product Quantity
1. In product detail view
2. Use +/- buttons to adjust quantity
3. Changes save automatically

### 3. Supplier Management
**Navigate**: Click "Suppliers" in sidebar

#### Viewing Suppliers
- See all active suppliers in a table
- Search by company name, contact, email, or city
- View supplier status (Active/Inactive)

#### Adding Supplier
1. Click "+ Add Supplier"
2. Enter supplier information:
   - Company Name (required)
   - Contact Person (required)
   - Email (required)
   - Phone Number
   - Address
   - City
   - Country
3. Toggle "Active" status (default: Active)
4. Click "Add Supplier"

#### Managing Suppliers
- Edit: Click pencil icon to edit
- Toggle Status: Click toggle switch
- Delete: Click trash icon (requires confirmation)

### 4. Order Management
**Navigate**: Click "Orders" in sidebar

#### Viewing Orders
- See all purchase orders with status
- Filter by status: All, Pending, Received, Cancelled
- Search orders by order number or notes
- See order dates and amounts

#### Creating Order
1. Click "Create Order"
2. Fill in order details:
   - Order Number (unique identifier)
   - Supplier (select from list)
   - Items (add products and quantities)
   - Estimated Delivery Date
   - Notes (optional)
3. System calculates total automatically
4. Click "Create Order"

#### Updating Order Status
1. Find order in list
2. Click status action button
3. Select new status:
   - **Pending**: Order placed, awaiting delivery
   - **Received**: Order received and in inventory
   - **Cancelled**: Order cancelled

---

## 📋 Form Validation Rules

### Product Form
| Field | Rules | Example |
|-------|-------|---------|
| Name | 2-50 chars | "Laptop Computer" |
| SKU | Format PROD-### | "PROD-001" |
| Quantity | ≥ 0 | "45" |
| Reorder Level | ≥ 1 | "20" |
| Price | > 0 | "1299.99" |

### Supplier Form
| Field | Rules |
|-------|-------|
| Name | Required, 2+ chars |
| Contact Person | Required |
| Email | Valid email format |
| Phone | Format: +1-555-0000 |

---

## 🎯 Status Indicators

### Stock Status
- 🟢 **Good**: Quantity > Reorder Level × 1.5
- 🟡 **Medium**: Quantity between Reorder Level and × 1.5
- 🔴 **Critical**: Quantity ≤ Reorder Level

### Order Status
- 🟡 **Pending**: Order placed, awaiting delivery
- 🟢 **Received**: Order received successfully
- 🔴 **Cancelled**: Order cancelled

---

## 🔍 Search & Filter Features

### Product Search
Search by:
- Product Name
- SKU code
- Description

### Search Tips
- Use partial words (e.g., "Lap" finds "Laptop")
- Case-insensitive searching
- Real-time filter results

### Sorting
Available sort options:
1. **By Name** (A-Z)
2. **By Quantity** (Low to High)
3. **By Price** (Low to High)

---

## 📱 Responsive Features

### Desktop (1264px+)
- Full sidebar navigation
- Multi-column grids
- Expanded tables

### Tablet (960px-1264px)
- Condensed sidebar
- 2-column layouts
- Adjusted tables

### Mobile (< 960px)
- Hamburger menu
- Single column
- Simplified tables
- Touch-friendly buttons

---

## ⌨️ Keyboard Shortcuts

| Action | Keyboard |
|--------|----------|
| Navigate | Tab key |
| Submit | Enter key |
| Close Dialog | Escape key |
| Delete (confirm) | Enter key |

---

## 💾 Data Persistence

### Current Setup
- Data stored in browser memory (in-service)
- Data resets on page refresh
- Suitable for demo/testing

### For Production
To add database persistence:

1. **Backend API**
   - Set up REST API endpoints
   - Implement CRUD operations
   - Add authentication

2. **Update Services**
   ```typescript
   constructor(private http: HttpClient) { }
   
   getProducts(): Observable<Product[]> {
     return this.http.get<Product[]>('/api/products');
   }
   ```

3. **Environment Configuration**
   - Set API endpoint URLs
   - Handle authentication tokens

---

## 🆘 Common Tasks

### Task: Add Low-Stock Alert
1. Go to Products
2. Set "Reorder Level" to desired threshold
3. Products below this level show as red (Critical)
4. Dashboard automatically shows count

### Task: Bulk Update Quantities
1. Go to Product Details
2. Use +/- buttons for each adjustment
3. Changes save automatically

### Task: Track Order Progress
1. Go to Orders
2. Filter by "Pending" status
3. Monitor estimated vs actual delivery
4. Update status when received

### Task: View Supplier Performance
1. Go to Orders
2. View all orders from specific supplier
3. Check delivery dates
4. Assess reliability

---

## 🐛 Troubleshooting

### Issue: Can't add product
**Solution**: 
- Check all required fields are filled
- Ensure SKU format is PROD-### (e.g., PROD-001)
- Price must be greater than 0

### Issue: Search not finding items
**Solution**:
- Check spelling
- Try partial search terms
- Spaces matter (try without extra spaces)

### Issue: Form won't submit
**Solution**:
- Check all required fields have values
- Hover over field labels to see requirements
- Red underline = validation error

### Issue: Quantity update failed
**Solution**:
- Must be whole number (no decimals)
- Cannot be negative
- Try refeshing page

---

## 📊 Data Examples

### Sample Product
```
Name: Laptop Computer
SKU: PROD-001
Description: High-performance laptop with 16GB RAM
Quantity: 45
Reorder Level: 20
Price: ₹1,299.99
Supplier: TechCore Supplies
```

### Sample Supplier
```
Name: TechCore Supplies
Contact: John Smith
Email: john@techcore.com
Phone: +1-555-0101
City: San Francisco
Country: USA
Status: Active
```

### Sample Order
```
Order Number: ORD-001
Supplier: TechCore Supplies
Items: 10x Laptop (PROD-001)
Order Date: 2026-01-15
Estimated Delivery: 2026-01-25
Status: Received
Total: ₹12,999.90
```

---

## 🎓 Learning Path

1. **Basic Navigation**
   - Explore sidebar
   - Visit each section
   - Understand main features

2. **Data Entry**
   - Add your first product
   - Add supplier information
   - Create test orders

3. **Advanced Features**
   - Use search and filters
   - Understand stock status levels
   - Track order lifecycle

4. **Administration**
   - Manage reorder levels
   - Update supplier status
   - Monitor inventory metrics

---

## 📞 Support Contacts

For issues or questions:
- Review PROJECT_DOCUMENTATION.md for detailed info
- Check component files for implementation details
- Test data is loaded automatically on first run

---

## ✅ Verification Checklist

After setup, verify:
- [ ] Dashboard loads with metrics
- [ ] Can add a product
- [ ] Can add a supplier
- [ ] Can create an order
- [ ] Sidebar navigation works
- [ ] Search functionality works
- [ ] Mobile view is responsive
- [ ] Form validation shows errors
- [ ] Status indicators display correctly

---

## 🚀 Next Steps

1. **Explore the Dashboard**: See key metrics
2. **Add Sample Data**: Create products, suppliers, orders
3. **Test Features**: Try search, filters, sorting
4. **Review Code**: Look at component implementations
5. **Customize**: Modify colors, add features

---

**Happy Inventory Managing! 📦**

Version 1.0.0 | Last Updated: March 9, 2026
