import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Order } from '../../core/models/order.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmation',
  imports: [CurrencyPipe, DatePipe, MatButtonModule, RouterLink],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.scss',
})
export class Confirmation {
  order?: Order;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.order = navigation?.extras.state?.['order'];
  }
}