import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../core/models/product.model';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule, CurrencyPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private productsService = inject(ProductsService);

  featuredProducts = signal<Product[]>([]);

  ngOnInit(): void {
    this.productsService.getFeaturedProducts().subscribe({
      next: (products) => {
        this.featuredProducts.set(products);
      },
      error: (error) => {
        console.error('Failed to load featured products', error);
      },
    });
  }
}