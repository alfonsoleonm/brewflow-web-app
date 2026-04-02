import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000';

    getProducts() {
        return this.http.get<Product[]>(`${this.apiUrl}/products`);
    }

    getFeaturedProducts() {
        return this.http.get<Product[]>(`${this.apiUrl}/products/featured`);
    }

    updateAvailability(id: string, available: boolean) {
        return this.http.patch<Product>(`${this.apiUrl}/products/${id}/availability`, {
            available,
        });
    }
}