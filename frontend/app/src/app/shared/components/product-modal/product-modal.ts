import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-modal',
  imports: [MatButtonModule, CurrencyPipe],
  templateUrl: './product-modal.html',
  styleUrl: './product-modal.scss',
})
export class ProductModal {
  private cartService = inject(CartService);

  @Input() product: Product | null = null;
  @Output() closed = new EventEmitter<void>();

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  close() {
    this.closed.emit();
  }
}