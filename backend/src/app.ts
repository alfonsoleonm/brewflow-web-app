import express from 'express';
import cors from 'cors';
import productsRoutes from './routes/products.routes.js';
import ordersRoutes from './routes/orders.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

export default app;