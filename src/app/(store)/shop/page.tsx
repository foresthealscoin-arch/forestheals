import { ProductGrid } from '@/components/store/product-grid';
import { products } from '@/data/products';

export default function ShopPage() {
  return (
    <main className="min-h-screen px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-3 text-sm tracking-[0.2em] text-[var(--forest)] uppercase">
            Functional essentials
          </p>

          <h1 className="text-4xl font-semibold tracking-tight lg:text-6xl">
            Shop wellness.
          </h1>

          <p className="mt-4 max-w-xl text-[var(--muted)]">
            Science-backed functional products designed for everyday health.
          </p>
        </div>

        <ProductGrid products={products} />
      </div>
    </main>
  );
}
