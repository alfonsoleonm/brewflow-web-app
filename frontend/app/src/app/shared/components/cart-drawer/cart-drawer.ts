import { Component, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-drawer',
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, CurrencyPipe],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.scss',
})
export class CartDrawer {
  cartService = inject(CartService);
  private router = inject(Router);

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}