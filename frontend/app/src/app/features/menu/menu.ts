import { Component, OnInit, ViewChild, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { Product, ProductCategory } from '../../core/models/product.model';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { CartDrawer } from '../../shared/components/cart-drawer/cart-drawer';
import { ProductModal } from '../../shared/components/product-modal/product-modal';

type CategoryFilter = 'All' | ProductCategory;

@Component({
  selector: 'app-menu',
  imports: [
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    CartDrawer,
    ProductModal,
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {
  private productsService = inject(ProductsService);
  private cartService = inject(CartService);

  @ViewChild('cartDrawer') cartDrawer!: MatDrawer;

  products = signal<Product[]>([]);
  selectedCategory = signal<CategoryFilter>('All');
  selectedProduct = signal<Product | null>(null);

  readonly categories: CategoryFilter[] = ['All', 'Coffee', 'Bakery', 'Food'];
  addedProductId = signal<string | null>(null);

  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const products = this.products();

    if (category === 'All') {
      return products;
    }

    return products.filter((product) => product.category === category);
  });

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: (error) => {
        console.error('Failed to load products', error);
      },
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.cartDrawer.open();
    this.addedProductId.set(product.id);

    setTimeout(() => {
      if (this.addedProductId() === product.id) {
        this.addedProductId.set(null);
      }
    }, 1200);
  }

  selectCategory(category: CategoryFilter) {
    this.selectedCategory.set(category);
  }

  openProductModal(product: Product) {
    this.selectedProduct.set(product);
  }

  closeProductModal() {
    this.selectedProduct.set(null);
  }

  get cartCount() {
    return this.cartService.itemCount();
  }
}