export type ProductCategory = 'Coffee' | 'Bakery' | 'Food';

export type Product = {
    id: string;
    name: string;
    category: ProductCategory;
    description: string;
    price: number;
    imageUrl: string;
    available: boolean;
    featured: boolean;
};