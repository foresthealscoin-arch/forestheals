import { ProductGrid } from '@/components/store/product-grid';
import { getProducts } from '@/lib/commerce/products';

export default async function ShopPage() {
  const products = await getProducts();

  const items = products.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    subtitle: 'Functional wellness',
    category: 'Wellness',
    priceCents: product.priceCents ?? 0,
    variantId: product.variantId ?? null,
    variantName: product.variantName ?? null,
    stock: product.stock ?? 0,
    image: product.image ?? '/images/products/collagen-coffee.jpg',
    benefits: [],
    tags: [],
    active: product.active,
  }));

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
        Forestheals
      </p>

      <h1 className="mt-3 text-4xl font-semibold lg:text-6xl">
        Shop wellness.
      </h1>

      <div className="mt-10">
        <ProductGrid products={items} />
      </div>
    </main>
  );
}
