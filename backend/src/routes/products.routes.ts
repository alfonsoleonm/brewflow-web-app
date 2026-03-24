import { Router } from 'express';
import { products } from '../data/products.js';

const router = Router();

router.get('/', (_req, res) => {
    res.json(products);
});

router.get('/featured', (_req, res) => {
    res.json(products.filter((product) => product.featured));
});

router.patch('/:id/availability', (req, res) => {
    const { id } = req.params;
    const { available } = req.body as { available?: boolean };

    const product = products.find((item) => item.id === id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    if (typeof available !== 'boolean') {
        return res.status(400).json({ message: 'available must be a boolean' });
    }

    product.available = available;
    return res.json(product);
});

export default router;