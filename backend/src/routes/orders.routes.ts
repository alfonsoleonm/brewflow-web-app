import { Router } from 'express';
import type { CreateOrderRequest, Order, OrderStatus } from '../models/order.js';
import { OrdersRepository } from '../repositories/orders.repository.js';

const router = Router();
const ordersRepository = new OrdersRepository();

const generateOrderId = () => `BF-${Math.floor(1000 + Math.random() * 9000)}`;

router.post('/', async (req, res) => {
    try {
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

        const created = await ordersRepository.create(order);

        return res.status(201).json(created);
    } catch (error) {
        console.error('Failed to create order', error);
        return res.status(500).json({ message: 'Failed to create order' });
    }
});

router.get('/', async (_req, res) => {
    try {
        const orders = await ordersRepository.findAll();

        const sorted = orders.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        return res.json(sorted);
    } catch (error) {
        console.error('Failed to fetch orders', error);
        return res.status(500).json({ message: 'Failed to fetch orders' });
    }
});

router.patch('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body as { status?: OrderStatus };

        const validStatuses: OrderStatus[] = [
            'RECEIVED',
            'PREPARING',
            'READY',
            'COMPLETED',
        ];

        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const updated = await ordersRepository.updateStatus(id, status);

        if (!updated) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.json(updated);
    } catch (error) {
        console.error('Failed to update order status', error);
        return res.status(500).json({ message: 'Failed to update order status' });
    }
});

export default router;