import type { Product } from '@/types/product';
import { Reveal, Stagger } from '@/components/ui/motion';
import { ProductCard } from './product-card';

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="animate-pulse overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--paper)] p-3"
          >
            <div className="aspect-[4/5] rounded-[22px] bg-[rgba(29,27,26,0.05)]" />
            <div className="mt-4 h-4 w-2/3 rounded-full bg-[rgba(29,27,26,0.08)]" />
            <div className="mt-3 h-3 w-1/2 rounded-full bg-[rgba(29,27,26,0.05)]" />
            <div className="mt-5 h-10 rounded-full bg-[rgba(29,27,26,0.08)]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
      {products.map((product, index) => (
        <Reveal key={product.id} delay={index * 0.04} className="h-full">
          <ProductCard product={product} />
        </Reveal>
      ))}
    </Stagger>
  );
}
