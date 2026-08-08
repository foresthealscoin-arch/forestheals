import { db } from './index';
import { categories, products, variants } from './schema';

async function seed() {
  const [category] = await db
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

  const [product] = await db
    .insert(products)
    .values({
      name: 'Collagen Coffee',
      slug: 'collagen-coffee',
      description: 'Functional daily wellness coffee.',
      categoryId,
    })
    .returning();

  await db.insert(variants).values({
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
