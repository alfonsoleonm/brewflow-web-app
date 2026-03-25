import { Component, computed, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CartService } from '../../core/services/cart.service';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    CurrencyPipe,
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  private ordersService = inject(OrdersService);
  private router = inject(Router);

  isSubmitting = false;

  cartItems = this.cartService.items;
  total = this.cartService.total;

  form = this.fb.group({
    customerName: ['', [Validators.required, Validators.minLength(2)]],
    note: [''],
  });

  readonly isCartEmpty = computed(() => this.cartItems().length === 0);

  submitOrder() {
    if (this.form.invalid || this.isCartEmpty()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const payload = {
      customerName: this.form.controls.customerName.value!.trim(),
      note: this.form.controls.note.value?.trim() || undefined,
      items: this.cartService.toOrderItems(),
      total: this.cartService.total(),
    };

    this.ordersService.createOrder(payload).subscribe({
      next: (order) => {
        this.cartService.clearCart();
        this.router.navigate(['/confirmation'], {
          state: { order },
        });
      },
      error: (error) => {
        console.error('Failed to create order', error);
        this.isSubmitting = false;
      },
    });
  }
}