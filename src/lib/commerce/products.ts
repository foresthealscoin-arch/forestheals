import { db, getDb } from '@/db';
import {
  products,
  variants,
  productImages,
  productBenefits,
  productIngredients,
  ingredients,
} from '@/db/schema';
import { getDevelopmentProductBySlug } from '@/data/products';
import { eq } from 'drizzle-orm';

export async function getProducts() {
  if (!db) {
    return [];
  }

  try {
    return await db
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
      .where(eq(products.active, true));
  } catch (error) {
    console.warn('Database unavailable, returning empty product list:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  if (!db) {
    return getDevelopmentProductBySlug(slug);
  }

  try {
    const database = getDb();
    const result = await database
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

    if (!result[0]) return getDevelopmentProductBySlug(slug);

    const benefits = await database
      .select({
        benefit: productBenefits.benefit,
      })
      .from(productBenefits)
      .where(eq(productBenefits.productId, result[0].id));

    const productIngredientRows = await database
      .select({
        name: ingredients.name,
        amount: productIngredients.amount,
      })
      .from(productIngredients)
      .innerJoin(
        ingredients,
        eq(productIngredients.ingredientId, ingredients.id),
      )
      .where(eq(productIngredients.productId, result[0].id));

    return {
      ...result[0],
      benefits: benefits.map((item) => item.benefit),
      ingredients: productIngredientRows,
    };
  } catch (error) {
    console.warn(`Database unavailable for product ${slug}, falling back to mock data:`, error);
    return getDevelopmentProductBySlug(slug);
  }
}
