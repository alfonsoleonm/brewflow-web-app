import { Router } from 'express';
import { orders } from '../data/orders.js';
import type { CreateOrderRequest, Order, OrderStatus } from '../models/order.js';

const router = Router();

const generateOrderId = () => `BF-${Math.floor(1000 + Math.random() * 9000)}`;

router.post('/', (req, res) => {
    const body = req.body as CreateOrderRequest;

    if (!body.customerName?.trim()) {
        return res.status(400).json({ message: 'customerName is required' });
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
        return res.status(400).json({ message: 'items are required' });
    }

    const order: Order = {
        id: generateOrderId(),
        customerName: body.customerName.trim(),
        note: body.note?.trim() || undefined,
        items: body.items,
        total: body.total,
        status: 'RECEIVED',
        createdAt: new Date().toISOString(),
    };

    orders.unshift(order);

    return res.status(201).json(order);
});

router.get('/', (_req, res) => {
    return res.json(orders);
});

router.patch('/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body as { status?: OrderStatus };

    const validStatuses: OrderStatus[] = ['RECEIVED', 'PREPARING', 'READY', 'COMPLETED'];

    if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    const order = orders.find((item) => item.id === id);

    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;

    return res.json(order);
});

export default router;