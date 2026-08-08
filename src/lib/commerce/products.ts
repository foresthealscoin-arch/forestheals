import { db } from '@/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getProducts() {
  return db.select().from(products).where(eq(products.active, true));
}

export async function getProductBySlug(slug: string) {
  const result = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  return result[0] ?? null;
}
