import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../core/models/product.model';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {
  private productsService = inject(ProductsService);

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
}