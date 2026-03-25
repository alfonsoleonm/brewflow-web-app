import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CreateOrderRequest, Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  createOrder(payload: CreateOrderRequest) {
    return this.http.post<Order>(`${this.apiUrl}/orders`, payload);
  }

  getOrders() {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`);
  }

  updateOrderStatus(id: string, status: Order['status']) {
    return this.http.patch<Order>(`${this.apiUrl}/orders/${id}/status`, { status });
  }
}