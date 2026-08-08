import 'dotenv/config';
import { db, getDb } from './index';
import { categories, products, variants } from './schema';

async function seed() {
  if (!db) {
    console.log('Database not configured. Skipping seed.');
    process.exit(0);
  }

  const database = getDb();

  const [category] = await database
    .insert(categories)
    .values({
      name: 'Wellness',
      slug: 'wellness',
    })
    .onConflictDoNothing()
    .returning();

  const categoryId = category?.id;

  if (!categoryId) {
    console.log('Wellness category already exists.');
    process.exit(0);
  }

  const [product] = await database
    .insert(products)
    .values({
      name: 'Collagen Coffee',
      slug: 'collagen-coffee',
      description: 'Functional daily wellness coffee.',
      categoryId,
    })
    .returning();

  await database.insert(variants).values({
    productId: product.id,
    sku: 'FH-COLLAGEN-01',
    name: '10 Sachets',
    priceCents: 99900,
    stock: 100,
  });

  console.log('Forestheals seed complete.');
  process.exit(0);
}

seed();
