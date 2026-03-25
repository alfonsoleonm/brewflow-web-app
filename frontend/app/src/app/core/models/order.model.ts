export type OrderStatus = 'RECEIVED' | 'PREPARING' | 'READY' | 'COMPLETED';

export type OrderItem = {
    productId: string;
    name: string;
    quantity: number;
    price: number;
};

export type Order = {
    id: string;
    customerName: string;
    note?: string;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    createdAt: string;
};

export type CreateOrderRequest = {
    customerName: string;
    note?: string;
    items: OrderItem[];
    total: number;
};