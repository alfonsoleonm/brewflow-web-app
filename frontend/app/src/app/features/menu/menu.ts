import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Product } from '../../core/models/product.model';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { CartDrawer } from '../../shared/components/cart-drawer/cart-drawer';

@Component({
  selector: 'app-menu',
  imports: [MatButtonModule, MatSidenavModule, MatIconModule, CartDrawer],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {
  private productsService = inject(ProductsService);
  private cartService = inject(CartService);

  @ViewChild('cartDrawer') cartDrawer!: MatDrawer;

  products: Product[] = [];

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error('Failed to load products', error);
      },
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.cartDrawer.open();
  }

  cartCount() {
    return this.cartService.itemCount();
  }
}