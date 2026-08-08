import { db } from '@/db';
import {
  products,
  variants,
  productImages,
  productBenefits,
} from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getProducts() {
  return db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      description: products.description,
      active: products.active,
      priceCents: variants.priceCents,
      variantName: variants.name,
      image: productImages.url,
    })
    .from(products)
    .leftJoin(variants, eq(variants.productId, products.id))
    .leftJoin(productImages, eq(productImages.productId, products.id))
    .where(eq(products.active, true));
}

export async function getProductBySlug(slug: string) {
  const result = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      description: products.description,
      active: products.active,
      priceCents: variants.priceCents,
      variantId: variants.id,
      variantName: variants.name,
      stock: variants.stock,
      image: productImages.url,
    })
    .from(products)
    .leftJoin(variants, eq(variants.productId, products.id))
    .leftJoin(productImages, eq(productImages.productId, products.id))
    .where(eq(products.slug, slug))
    .limit(1);

  if (!result[0]) return null;

  const benefits = await db
    .select({
      benefit: productBenefits.benefit,
    })
    .from(productBenefits)
    .where(eq(productBenefits.productId, result[0].id));

  return {
    ...result[0],
    benefits: benefits.map((item) => item.benefit),
  };
}
