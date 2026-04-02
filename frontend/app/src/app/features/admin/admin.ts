import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { OrdersService } from '../../core/services/orders.service';
import { Order, OrderStatus } from '../../core/models/order.model';
import { Product } from '../../core/models/product.model';
import { ProductsService } from '../../core/services/products.service';

type StatusFilter = 'ALL' | OrderStatus;

@Component({
  selector: 'app-admin',
  imports: [CurrencyPipe, DatePipe, MatButtonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  private ordersService = inject(OrdersService);
  private productsService = inject(ProductsService);

  products = signal<Product[]>([]);

  orders = signal<Order[]>([]);
  selectedStatus = signal<StatusFilter>('ALL');
  isLoading = signal(true);

  filteredOrders = computed(() => {
    const selected = this.selectedStatus();
    const allOrders = this.orders();

    if (selected === 'ALL') {
      return allOrders;
    }

    return allOrders.filter((order) => order.status === selected);
  });

  readonly filters: StatusFilter[] = [
    'ALL',
    'RECEIVED',
    'PREPARING',
    'READY',
    'COMPLETED',
  ];

  ngOnInit() {
    this.loadOrders();
    this.loadProducts();
  }

  loadOrders() {
    this.isLoading.set(true);

    this.ordersService.getOrders().subscribe({
      next: (orders) => {
        this.orders.set(orders);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Failed to load orders', error);
        this.isLoading.set(false);
      },
    });
  }

  loadProducts() {
    this.productsService.getProducts().subscribe({
      next: (products) => this.products.set(products),
      error: (error) => console.error('Failed to load products', error),
    });
  }

  selectFilter(filter: StatusFilter) {
    this.selectedStatus.set(filter);
  }

  updateStatus(order: Order, status: OrderStatus) {
    if (order.status === status) {
      return;
    }

    this.ordersService.updateOrderStatus(order.id, status).subscribe({
      next: (updatedOrder) => {
        this.orders.update((orders) =>
          orders.map((item) => (item.id === updatedOrder.id ? updatedOrder : item))
        );
      },
      error: (error) => {
        console.error('Failed to update order status', error);
      },
    });
  }

  getStatusClass(status: OrderStatus) {
    switch (status) {
      case 'RECEIVED':
        return 'status-received';
      case 'PREPARING':
        return 'status-preparing';
      case 'READY':
        return 'status-ready';
      case 'COMPLETED':
        return 'status-completed';
      default:
        return '';
    }
  }

  getItemsSummary(order: Order) {
    return order.items.map((item) => `${item.quantity}× ${item.name}`).join(', ');
  }

  toggleAvailability(productId: string, current: boolean) {
    this.productsService.updateAvailability(productId, !current).subscribe({
      next: (updatedProduct) => {
        this.products.update((products) =>
          products.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
      },
      error: (error) => console.error('Failed to toggle product availability', error),
    });
  }
}