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
    priceCents: 99900,
    image: '/images/products/collagen-coffee.jpg',
    benefits: [],
    tags: [],
    active: product.active,
  }));

  return (
    <main className="min-h-screen px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[var(--forest)]">
          Functional essentials
        </p>

        <h1 className="text-4xl font-semibold lg:text-6xl">
          Shop wellness.
        </h1>

        <div className="mt-10">
          <ProductGrid products={items} />
        </div>
      </div>
    </main>
  );
}
