import { Router } from 'express';
import { ProductsRepository } from '../repositories/products.repository.js';

const router = Router();
const productsRepository = new ProductsRepository();

router.get('/', async (_req, res) => {
    try {
        const products = await productsRepository.findAll();
        return res.json(products);
    } catch (error) {
        console.error('Failed to fetch products', error);
        return res.status(500).json({ message: 'Failed to fetch products' });
    }
});

router.get('/featured', async (_req, res) => {
    try {
        const products = await productsRepository.findAll();
        return res.json(products.filter((product) => product.featured));
    } catch (error) {
        console.error('Failed to fetch featured products', error);
        return res.status(500).json({ message: 'Failed to fetch featured products' });
    }
});

router.patch('/:id/availability', async (req, res) => {
    try {
        const { id } = req.params;
        const { available } = req.body as { available?: boolean };

        if (typeof available !== 'boolean') {
            return res.status(400).json({ message: 'available must be a boolean' });
        }

        const updated = await productsRepository.updateAvailability(id, available);

        if (!updated) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.json(updated);
    } catch (error) {
        console.error('Failed to update product availability', error);
        return res.status(500).json({ message: 'Failed to update product availability' });
    }
});

export default router;