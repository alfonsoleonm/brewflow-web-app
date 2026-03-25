import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.model';

export type CartItem = Product & {
  quantity: number;
};

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itemsSignal = signal<CartItem[]>([]);

  items = this.itemsSignal.asReadonly();

  total = computed(() =>
    this.itemsSignal().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  itemCount = computed(() =>
    this.itemsSignal().reduce((sum, item) => sum + item.quantity, 0)
  );

  addToCart(product: Product) {
    this.itemsSignal.update((items) => {
      const existing = items.find((item) => item.id === product.id);

      if (existing) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...items, { ...product, quantity: 1 }];
    });
  }

  decreaseQuantity(productId: string) {
    this.itemsSignal.update((items) =>
      items
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  removeFromCart(productId: string) {
    this.itemsSignal.update((items) =>
      items.filter((item) => item.id !== productId)
    );
  }

  clearCart() {
    this.itemsSignal.set([]);
  }
}