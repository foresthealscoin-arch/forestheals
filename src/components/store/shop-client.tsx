'use client';

import { useMemo, useState } from 'react';
import { ProductGrid } from '@/components/store/product-grid';
import { SearchBox } from '@/components/search/search-box';
import { ProductFilters } from '@/components/store/product-filters';
import { searchProducts } from '@/lib/search/search';

type Product = {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  category: string;
  priceCents: number;
  variantId?: string | null;
  variantName?: string | null;
  stock?: number | null;
  image: string | null;
  benefits: string[];
  tags: string[];
  active: boolean;
};

export function ShopClient({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const categories = [...new Set(products.map((p) => p.category))];

  const filtered = useMemo(() => {
    let result = searchProducts(products, query);

    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    return result;
  }, [products, query, category]);

  return (
    <>
      <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto]">
        <SearchBox value={query} onChange={setQuery} />
        <ProductFilters
          categories={categories}
          selected={category}
          onChange={setCategory}
        />
      </div>

      <div className="mt-10">
        <ProductGrid products={filtered} />
      </div>
    </>
  );
}
