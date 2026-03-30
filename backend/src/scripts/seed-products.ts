import dotenv from 'dotenv';
import { ProductsRepository } from '../repositories/products.repository.js';
import { productsSeed } from '../data/products.seed.js';

dotenv.config();

const repository = new ProductsRepository();

async function seed() {
  for (const product of productsSeed) {
    await repository.create(product);
  }

  console.log(`Seeded ${productsSeed.length} products`);
}

seed().catch((error) => {
  console.error('Failed to seed products', error);
  process.exit(1);
});