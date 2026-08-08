import { ShopClient } from '@/components/store/shop-client';
import { getProducts } from '@/lib/commerce/products';
import { products as developmentProducts } from '@/data/products';

export default async function ShopPage() {
  const products = await getProducts();

  const itemLookup = new Map(
    developmentProducts.map((product) => [product.slug, product]),
  );

  const items = products.length
    ? products.map((product) => {
        const fallback = itemLookup.get(product.slug) ?? itemLookup.get('collagen-coffee');

        return {
          id: product.id,
          name: product.name,
          slug: product.slug,
          subtitle: fallback?.subtitle ?? 'Functional wellness',
          description: product.description ?? fallback?.description ?? '',
          category: fallback?.category ?? 'Wellness',
          priceCents: product.priceCents ?? fallback?.priceCents ?? 0,
          variantId: product.variantId ?? null,
          variantName: product.variantName ?? null,
          stock: product.stock ?? fallback?.stock ?? 0,
          image: product.image ?? fallback?.image ?? '/images/products/collagen-coffee.jpg',
          images: fallback?.images ?? [fallback?.image ?? '/images/products/collagen-coffee.jpg'],
          compareAtCents: fallback?.compareAtCents,
          benefits: fallback?.benefits ?? [],
          tags: fallback?.tags ?? [],
          active: product.active,
          isBestSeller: fallback?.isBestSeller ?? false,
          rating: fallback?.rating,
        };
      })
    : developmentProducts.map((product) => ({
        ...product,
        variantId: null,
        variantName: 'Standard',
      }));

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
        Forestheals
      </p>

      <h1 className="mt-3 text-4xl font-semibold lg:text-6xl">
        Shop wellness.
      </h1>

      <ShopClient products={items} />
    </main>
  );
}
