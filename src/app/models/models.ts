export interface Product {
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

export interface Supplier {
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

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  unitPrice: number;
}

export interface Order {
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

export interface InventoryMetrics {
  totalProducts: number;
  totalStock: number;
  lowStockProducts: number;
  activeSuppliersCount: number;
  pendingOrders: number;
  totalOrderValue: number;
}
